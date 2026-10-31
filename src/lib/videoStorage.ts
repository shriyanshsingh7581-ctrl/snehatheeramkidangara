/**
 * Video Storage & Management Module
 * Supports local file uploads (persisted via IndexedDB), direct MP4 links, and YouTube embeds.
 * Synced with Firestore settings/videos when available.
 */

import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  category:
    | 'All'
    | 'Center Tour'
    | 'Rehabilitation & Care'
    | 'Vocational & Life Skills'
    | 'Daily Life & Prayer'
    | 'Events & Community';
  sourceType: 'local_file' | 'youtube' | 'direct_url';
  videoUrl: string;
  embedUrl?: string;
  thumbnailUrl?: string;
  duration?: string;
  fileSizeMb?: number;
  uploadedAt: string;
  isCustomUploaded?: boolean;
}

export const VIDEO_CATEGORIES = [
  'All',
  'Center Tour',
  'Rehabilitation & Care',
  'Vocational & Life Skills',
  'Daily Life & Prayer',
  'Events & Community',
] as const;

export const DEFAULT_VIDEOS: VideoItem[] = [];

// --- INDEXEDDB HELPER FOR PERSISTING UPLOADED VIDEO BLOBS ---
const DB_NAME = 'snehatheeram_media_db';
const STORE_NAME = 'videos_blobs';
const DB_VERSION = 1;

function openVideoBlobDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function storeVideoBlob(id: string, file: Blob): Promise<void> {
  try {
    const db = await openVideoBlobDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(file, id);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('Failed to store video in IndexedDB:', err);
  }
}

export async function getVideoBlob(id: string): Promise<Blob | null> {
  try {
    const db = await openVideoBlobDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(id);
      req.onsuccess = () => resolve((req.result as Blob) || null);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('Failed to load video from IndexedDB:', err);
    return null;
  }
}

export async function deleteVideoBlob(id: string): Promise<void> {
  try {
    const db = await openVideoBlobDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(id);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('Failed to delete video from IndexedDB:', err);
  }
}

// Convert YouTube/Vimeo URLs to embeddable URLs
export function formatVideoUrl(url: string): { embedUrl?: string; isYouTube: boolean } {
  if (!url) return { isYouTube: false };

  // YouTube matchers: youtu.be/xyz, youtube.com/watch?v=xyz, youtube.com/shorts/xyz
  const ytMatch = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/
  );
  if (ytMatch && ytMatch[1]) {
    return {
      embedUrl: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`,
      isYouTube: true,
    };
  }

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/[^/]*\/videos\/|album\/(?:\d+\/)?video\/|)(\d+)/);
  if (vimeoMatch && vimeoMatch[1]) {
    return {
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`,
      isYouTube: false,
    };
  }

  return { isYouTube: false };
}

// Local storage key for fallback / immediate sync
const LOCAL_STORAGE_VIDEOS_KEY = 'snehatheeram_custom_videos';

export function getLocalStoredVideos(): VideoItem[] {
  if (typeof window === 'undefined') return DEFAULT_VIDEOS;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_VIDEOS_KEY);
    if (!raw) return DEFAULT_VIDEOS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (e) {
    console.warn('Error reading stored videos:', e);
  }
  return DEFAULT_VIDEOS;
}

export function saveLocalStoredVideos(videos: VideoItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_VIDEOS_KEY, JSON.stringify(videos));
  } catch (e) {
    console.warn('Error writing stored videos to localStorage:', e);
  }
}

// Subscribe to Firestore settings/videos with fallback to localStorage
export function subscribeToSiteVideos(
  callback: (videos: VideoItem[]) => void
): () => void {
  try {
    const docRef = doc(db, 'settings', 'videos');
    const unsub = onSnapshot(
      docRef,
      async (snap) => {
        if (snap.exists() && snap.data()?.items) {
          const remoteItems = snap.data().items as VideoItem[];
          // Re-hydrate any local indexedDB blob URLs if needed
          const hydrated = await Promise.all(
            remoteItems.map(async (v) => {
              if (v.sourceType === 'local_file' && v.id) {
                const blob = await getVideoBlob(v.id);
                if (blob) {
                  return { ...v, videoUrl: URL.createObjectURL(blob) };
                }
              }
              return v;
            })
          );
          saveLocalStoredVideos(hydrated);
          callback(hydrated);
        } else {
          // Check local storage or defaults
          const localVideos = getLocalStoredVideos();
          callback(localVideos);
        }
      },
      (err) => {
        console.warn('Firestore video sync notice (using local):', err.message);
        callback(getLocalStoredVideos());
      }
    );
    return unsub;
  } catch {
    callback(getLocalStoredVideos());
    return () => {};
  }
}

// Save videos to both Firestore and localStorage
export async function syncVideosToFirestore(videos: VideoItem[]): Promise<void> {
  // Store stripped metadata in Firestore (exclude oversized blob object URLs which are ephemeral)
  const metadataToStore = videos.map((v) => {
    if (v.sourceType === 'local_file') {
      return {
        ...v,
        videoUrl: '', // Will be rehydrated from indexedDB blob on that device
      };
    }
    return v;
  });

  saveLocalStoredVideos(videos);

  try {
    const docRef = doc(db, 'settings', 'videos');
    await setDoc(
      docRef,
      {
        items: metadataToStore,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (err) {
    console.warn('Could not sync videos to Firestore, saved locally:', err);
  }
}
