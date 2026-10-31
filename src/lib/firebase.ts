import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, User } from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  getDocFromServer,
  Timestamp,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App singleton
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

/* CRITICAL: The app will break without specifying firestoreDatabaseId */
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Test connection on boot
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'settings', 'content'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client appears offline, will sync once connected.');
    }
  }
}
testConnection();

// --- TYPE DEFINITIONS FOR FIREBASE DATA ---

export interface StoredSiteContent {
  name?: string;
  shortReferenceName?: string;
  fullName?: string;
  memorialTitle?: string;
  tagline?: string;
  description?: string;
  mentalHealthHeading?: string;
  mentalHealthLead?: string;
  mentalHealthBody?: string;
  mission?: string;
  vision?: string;
  primaryPhone?: string;
  secondaryPhone?: string;
  landline?: string;
  provincePhone?: string;
  email?: string;
  addressLines?: string;
  landmark?: string;
  bankAccountName?: string;
  bankName?: string;
  bankAccountNumber?: string;
  bankIfsc?: string;
  bankUpiId?: string;
  bankIsConfigured?: boolean;
  bibleVerse?: string;
  bibleReference?: string;
  visitingHoursSchedule?: string;
  brochureVersion?: string;
  updatedAt?: string;
}

export interface StoredSitePhotos {
  heroSanctuary?: string;
  everyMotherLove?: string;
  kuttanadCampus?: string;
  psychosocialRehab?: string;
  mentalHealthCounselling?: string;
  vocationalTraining?: string;
  medicalNursing?: string;
  clinicalCheckup?: string;
  recreationalActivities?: string;
  sustainabilityKitchen?: string;
  nutritiousMeals?: string;
  spiritualSupport?: string;
  updatedAt?: string;
}

export interface StoredSubmission {
  id: string;
  fullName: string;
  phone: string;
  occasion: string;
  preferredDate: string;
  sponsorshipType: string;
  prayerNote?: string;
  additionalMessage?: string;
  status: 'new' | 'contacted' | 'confirmed' | 'archived';
  createdAt: string;
}

// --- FIRESTORE OPERATIONS ---

/**
 * Save new donor sponsorship inquiry into Firestore
 */
export async function saveDonationSubmission(data: {
  fullName: string;
  phone: string;
  occasion: string;
  preferredDate: string;
  sponsorshipType: string;
  prayerNote?: string;
  additionalMessage?: string;
}): Promise<string> {
  const submissionId = `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const path = `submissions/${submissionId}`;
  try {
    await setDoc(doc(db, 'submissions', submissionId), {
      fullName: data.fullName.trim(),
      phone: data.phone.trim(),
      occasion: data.occasion,
      preferredDate: data.preferredDate,
      sponsorshipType: data.sponsorshipType,
      prayerNote: data.prayerNote?.trim() || '',
      additionalMessage: data.additionalMessage?.trim() || '',
      status: 'new',
      createdAt: new Date().toISOString(),
    });
    return submissionId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

/**
 * Subscribe in real-time to Site Content
 */
export function subscribeToSiteContent(
  onData: (data: StoredSiteContent | null) => void,
  onError?: (err: unknown) => void
) {
  const path = 'settings/content';
  return onSnapshot(
    doc(db, 'settings', 'content'),
    (snap) => {
      if (snap.exists()) {
        onData(snap.data() as StoredSiteContent);
      } else {
        onData(null);
      }
    },
    (error) => {
      if (onError) onError(error);
      handleFirestoreError(error, OperationType.GET, path);
    }
  );
}

/**
 * Save / Update Site Content in Firestore
 */
export async function saveSiteContent(content: StoredSiteContent): Promise<void> {
  const path = 'settings/content';
  try {
    await setDoc(
      doc(db, 'settings', 'content'),
      {
        ...content,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

/**
 * Subscribe in real-time to Site Photos
 */
export function subscribeToSitePhotos(
  onData: (data: StoredSitePhotos | null) => void,
  onError?: (err: unknown) => void
) {
  const path = 'settings/photos';
  return onSnapshot(
    doc(db, 'settings', 'photos'),
    (snap) => {
      if (snap.exists()) {
        onData(snap.data() as StoredSitePhotos);
      } else {
        onData(null);
      }
    },
    (error) => {
      if (onError) onError(error);
      handleFirestoreError(error, OperationType.GET, path);
    }
  );
}

/**
 * Save / Update Site Photos in Firestore
 */
export async function saveSitePhotos(photos: StoredSitePhotos): Promise<void> {
  const path = 'settings/photos';
  try {
    await setDoc(
      doc(db, 'settings', 'photos'),
      {
        ...photos,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

/**
 * Subscribe in real-time to Donation Submissions (Admin view)
 */
export function subscribeToSubmissions(
  onData: (submissions: StoredSubmission[]) => void,
  onError?: (err: unknown) => void
) {
  const path = 'submissions';
  const q = query(collection(db, 'submissions'), orderBy('createdAt', 'desc'));
  return onSnapshot(
    q,
    (snap) => {
      const items: StoredSubmission[] = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<StoredSubmission, 'id'>),
      }));
      onData(items);
    },
    (error) => {
      if (onError) onError(error);
      handleFirestoreError(error, OperationType.LIST, path);
    }
  );
}

/**
 * Update Submission Status
 */
export async function updateSubmissionStatus(
  id: string,
  status: StoredSubmission['status']
): Promise<void> {
  const path = `submissions/${id}`;
  try {
    await setDoc(doc(db, 'submissions', id), { status }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

/**
 * Delete a submission
 */
export async function deleteSubmission(id: string): Promise<void> {
  const path = `submissions/${id}`;
  try {
    await deleteDoc(doc(db, 'submissions', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}
