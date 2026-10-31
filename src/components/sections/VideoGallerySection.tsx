import React, { useState, useEffect } from 'react';
import {
  Play,
  Film,
  Upload,
  X,
  Maximize2,
  Trash2,
  Sparkles,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import {
  VideoItem,
  VIDEO_CATEGORIES,
  DEFAULT_VIDEOS,
  subscribeToSiteVideos,
  syncVideosToFirestore,
  deleteVideoBlob,
} from '../../lib/videoStorage';
import { UploadVideoModal } from '../UploadVideoModal';

export const VideoGallerySection: React.FC = () => {
  const [videos, setVideos] = useState<VideoItem[]>(DEFAULT_VIDEOS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [deleteNotice, setDeleteNotice] = useState<string | null>(null);

  // Subscribe to live video updates
  useEffect(() => {
    const unsub = subscribeToSiteVideos((updated) => {
      setVideos(updated);
    });
    return () => unsub();
  }, []);

  const filteredVideos = videos.filter((vid) => {
    if (selectedCategory === 'All') return true;
    return vid.category === selectedCategory;
  });

  const handleVideoAdded = (newVid: VideoItem) => {
    const updated = [newVid, ...videos];
    setVideos(updated);
    syncVideosToFirestore(updated);
  };

  const handleDeleteVideo = async (e: React.MouseEvent, vid: VideoItem) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to remove "${vid.title}"?`)) {
      if (vid.sourceType === 'local_file') {
        await deleteVideoBlob(vid.id);
      }
      const updated = videos.filter((v) => v.id !== vid.id);
      setVideos(updated);
      syncVideosToFirestore(updated);
      setDeleteNotice('Video removed successfully');
      setTimeout(() => setDeleteNotice(null), 3000);
      if (activeVideo?.id === vid.id) {
        setActiveVideo(null);
      }
    }
  };

  return (
    <section
      id="video-gallery"
      className="relative bg-white py-12 sm:py-16 lg:py-20 border-b border-[#2E7D32]/10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 sm:mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#E8F5E9] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#1B5E20] mb-3">
              <Film className="h-3.5 w-3.5" />
              <span>Video Highlights & Stories</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#1B5E20]">
              Life & Rehabilitation in Motion
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#607D66]">
              Witness the inspiring daily journey of healing, psychiatric care, handicraft skills,
              and prayer at Pope John XXIII Rehabilitation Centre Trust, Snehatheeram Kidangara.
            </p>
          </div>

          {/* Action button: Upload Video */}
          <div className="shrink-0 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsUploadModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-[#2E7D32] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-[#1B5E20] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B5E20] cursor-pointer"
            >
              <Upload className="h-4 w-4" />
              Upload Video
            </button>
          </div>
        </div>

        {/* Delete notification */}
        {deleteNotice && (
          <div className="mb-6 flex items-center gap-2 rounded-xl bg-green-50 p-3 text-xs text-green-700 border border-green-200">
            <CheckCircle2 className="h-4 w-4" />
            <span>{deleteNotice}</span>
          </div>
        )}

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar mb-6 sm:mb-8">
          {VIDEO_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1B5E20] text-white shadow-xs'
                    : 'bg-[#E8F5E9]/70 text-[#2E7D32] hover:bg-[#E8F5E9] hover:text-[#1B5E20]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Videos Grid */}
        {filteredVideos.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#2E7D32]/20 bg-[#E8F5E9]/20 py-16 px-4 text-center">
            <Film className="h-12 w-12 text-[#2E7D32]/60 mb-3" />
            <p className="font-display text-base font-bold text-[#1B5E20]">No videos in this category</p>
            <p className="mt-1 text-xs text-gray-500 max-w-sm">
              Be the first to upload a video highlight or tour of Snehatheeram.
            </p>
            <button
              type="button"
              onClick={() => setIsUploadModalOpen(true)}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#2E7D32] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1B5E20]"
            >
              <Upload className="h-3.5 w-3.5" />
              Upload Video Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredVideos.map((video) => (
              <article
                key={video.id}
                onClick={() => setActiveVideo(video)}
                className="group relative flex flex-col overflow-hidden rounded-2xl bg-[#E8F5E9]/30 border border-[#2E7D32]/20 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                {/* Thumbnail / Video Preview Box */}
                <div className="relative aspect-video w-full overflow-hidden bg-black">
                  {video.sourceType === 'local_file' && video.videoUrl ? (
                    <video
                      src={video.videoUrl}
                      preload="metadata"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <img
                      src={video.thumbnailUrl || '/assets/aistudio/hero_rehab_support.jpg'}
                      alt={video.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}

                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Play Button Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-13 w-13 items-center justify-center rounded-full bg-white/90 text-[#1B5E20] shadow-lg backdrop-blur-xs transition-transform duration-300 group-hover:scale-110 group-hover:bg-white">
                      <Play className="h-6 w-6 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Duration / Source Badge */}
                  <div className="absolute bottom-2.5 right-2.5 rounded-md bg-black/75 px-2 py-0.5 text-[10px] font-semibold text-white tracking-wider">
                    {video.duration || 'Watch'}
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-2.5 left-2.5 rounded-md bg-[#1B5E20]/90 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-semibold text-white tracking-wide">
                    {video.category}
                  </div>

                  {/* Delete option for custom uploads */}
                  {video.isCustomUploaded && (
                    <button
                      type="button"
                      title="Remove this video"
                      onClick={(e) => handleDeleteVideo(e, video)}
                      className="absolute top-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
                  <div>
                    <h3 className="font-display text-base font-bold text-[#1B5E20] line-clamp-2 group-hover:text-[#2E7D32] transition-colors">
                      {video.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-[#607D66] line-clamp-2">
                      {video.description}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between pt-3 border-t border-[#2E7D32]/10 text-[11px] text-[#607D66]">
                    <span className="font-medium text-[#2E7D32] flex items-center gap-1">
                      <Play className="h-3 w-3 fill-current" />
                      Play Video
                    </span>
                    <span>{video.uploadedAt}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Video Player Lightbox Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-6 backdrop-blur-sm animate-in fade-in"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-[#1B5E20]/95 shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5 text-white">
              <div className="flex items-center gap-2 pr-4 min-w-0">
                <span className="rounded bg-white/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                  {activeVideo.category}
                </span>
                <h3 className="truncate font-display text-sm sm:text-base font-bold text-white">
                  {activeVideo.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Video Player Frame */}
            <div className="relative aspect-video w-full bg-black">
              {activeVideo.embedUrl ? (
                <iframe
                  src={activeVideo.embedUrl}
                  title={activeVideo.title}
                  className="h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : activeVideo.videoUrl ? (
                <video
                  src={activeVideo.videoUrl}
                  controls
                  autoPlay
                  playsInline
                  className="h-full w-full object-contain"
                >
                  Your browser does not support HTML5 video playback.
                </video>
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center text-white/60">
                  <Film className="h-10 w-10 mb-2" />
                  <p className="text-xs">Video content is not available</p>
                </div>
              )}
            </div>

            {/* Modal Footer / Description */}
            <div className="p-4 sm:p-5 text-white">
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                {activeVideo.description}
              </p>
              <div className="mt-3 flex items-center justify-between text-[11px] text-white/60">
                <span>Pope John XXIII Rehabilitation Centre Trust, Kidangara</span>
                <span>Uploaded: {activeVideo.uploadedAt}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Video Modal */}
      <UploadVideoModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onVideoAdded={handleVideoAdded}
      />
    </section>
  );
};
