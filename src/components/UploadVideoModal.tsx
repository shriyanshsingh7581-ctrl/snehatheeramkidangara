import React, { useState, useRef } from 'react';
import {
  X,
  Upload,
  Link2,
  Film,
  Play,
  CheckCircle2,
  AlertCircle,
  Loader2,
  FileVideo,
} from 'lucide-react';
import {
  VideoItem,
  VIDEO_CATEGORIES,
  storeVideoBlob,
  formatVideoUrl,
} from '../lib/videoStorage';
import { uploadVideoToCloudinary } from '../lib/cloudinary';

interface UploadVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVideoAdded: (video: VideoItem) => void;
}

export const UploadVideoModal: React.FC<UploadVideoModalProps> = ({
  isOpen,
  onClose,
  onVideoAdded,
}) => {
  const [activeTab, setActiveTab] = useState<'file' | 'link'>('file');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<VideoItem['category']>('Rehabilitation & Care');
  const [urlInput, setUrlInput] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');

  // File Upload State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      setErrorMessage('Please select a valid video file (.mp4, .webm, .mov)');
      return;
    }

    // Max 100MB check
    if (file.size > 100 * 1024 * 1024) {
      setErrorMessage('File size exceeds 100MB. For larger videos, consider uploading via a YouTube link.');
      return;
    }

    setErrorMessage(null);
    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    // Auto fill title if empty
    if (!title) {
      const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      setTitle(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (!file.type.startsWith('video/')) {
        setErrorMessage('Please drop a valid video file.');
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setErrorMessage(null);
      if (!title) {
        const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        setTitle(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!title.trim()) {
      setErrorMessage('Please enter a title for the video.');
      return;
    }

    setIsProcessing(true);
    setUploadProgress(10);

    try {
      const newId = `vid_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      const nowStr = new Date().toISOString().split('T')[0];

      if (activeTab === 'file') {
        if (!selectedFile && !previewUrl) {
          setErrorMessage('Please select or upload a video file.');
          setIsProcessing(false);
          return;
        }

        let finalVideoUrl = previewUrl || '';
        let finalSourceType: VideoItem['sourceType'] = 'local_file';

        if (selectedFile) {
          try {
            finalVideoUrl = await uploadVideoToCloudinary(selectedFile, (pct) => {
              setUploadProgress(Math.max(15, Math.min(95, pct)));
            });
            finalSourceType = 'direct_url';
          } catch {
            // Fallback to local IndexedDB storage
            setUploadProgress(50);
            await storeVideoBlob(newId, selectedFile);
            finalSourceType = 'local_file';
          }
        }

        const fileSizeMb = selectedFile ? Math.round((selectedFile.size / (1024 * 1024)) * 10) / 10 : undefined;

        const newVideo: VideoItem = {
          id: newId,
          title: title.trim(),
          description: description.trim() || 'Snehatheeram Rehabilitation Activity Video',
          category: category === 'All' ? 'Rehabilitation & Care' : category,
          sourceType: finalSourceType,
          videoUrl: finalVideoUrl,
          thumbnailUrl: thumbnailUrl.trim() || '/assets/aistudio/hero_rehab_support.jpg',
          fileSizeMb,
          duration: 'Uploaded Video',
          uploadedAt: nowStr,
          isCustomUploaded: true,
        };

        setUploadProgress(100);
        setSuccessMessage('Video successfully added to gallery!');
        setTimeout(() => {
          onVideoAdded(newVideo);
          onClose();
        }, 600);
      } else {
        // Link tab
        if (!urlInput.trim()) {
          setErrorMessage('Please enter a YouTube or direct video URL.');
          setIsProcessing(false);
          return;
        }

        const { embedUrl, isYouTube } = formatVideoUrl(urlInput.trim());

        const newVideo: VideoItem = {
          id: newId,
          title: title.trim(),
          description: description.trim() || 'Snehatheeram Video Stream',
          category: category === 'All' ? 'Rehabilitation & Care' : category,
          sourceType: isYouTube ? 'youtube' : 'direct_url',
          videoUrl: urlInput.trim(),
          embedUrl,
          thumbnailUrl: thumbnailUrl.trim() || '/assets/aistudio/hero_rehab_support.jpg',
          duration: isYouTube ? 'YouTube Video' : 'Online Stream',
          uploadedAt: nowStr,
          isCustomUploaded: true,
        };

        setUploadProgress(100);
        setSuccessMessage('Video link added to gallery!');
        setTimeout(() => {
          onVideoAdded(newVideo);
          onClose();
        }, 600);
      }
    } catch (err) {
      setErrorMessage('Failed to save video: ' + (err instanceof Error ? err.message : String(err)));
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in">
      <div
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl border border-[#2E7D32]/20 text-[#263238]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#2E7D32]/20 bg-white/95 px-5 py-4 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E8F5E9] text-[#1B5E20]">
              <Film className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-[#1B5E20]">
                Add / Upload Video
              </h3>
              <p className="text-xs text-[#607D66]">
                Share rehabilitation activities, center tour, or special events
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Method Tabs */}
          <div className="grid grid-cols-2 gap-2 rounded-xl bg-[#E8F5E9]/60 p-1">
            <button
              type="button"
              onClick={() => setActiveTab('file')}
              className={`flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-semibold transition-all ${
                activeTab === 'file'
                  ? 'bg-white text-[#1B5E20] shadow-xs'
                  : 'text-[#607D66] hover:text-[#1B5E20]'
              }`}
            >
              <Upload className="h-4 w-4" />
              Upload Video File
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('link')}
              className={`flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-semibold transition-all ${
                activeTab === 'link'
                  ? 'bg-white text-[#1B5E20] shadow-xs'
                  : 'text-[#607D66] hover:text-[#1B5E20]'
              }`}
            >
              <Link2 className="h-4 w-4" />
              YouTube / Web Link
            </button>
          </div>

          {/* Feedback messages */}
          {errorMessage && (
            <div className="flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs text-red-700 border border-red-200">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
          {successMessage && (
            <div className="flex items-center gap-2 rounded-xl bg-green-50 p-3 text-xs text-green-700 border border-green-200">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Tab 1: File Dropzone */}
          {activeTab === 'file' ? (
            <div className="space-y-3">
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center cursor-pointer transition-colors ${
                  previewUrl
                    ? 'border-[#2E7D32] bg-[#E8F5E9]/20'
                    : 'border-gray-300 hover:border-[#2E7D32] hover:bg-[#E8F5E9]/10'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/mp4,video/webm,video/ogg,video/quicktime"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {previewUrl ? (
                  <div className="w-full space-y-2">
                    <video
                      src={previewUrl}
                      controls
                      className="mx-auto max-h-48 w-full rounded-lg object-cover bg-black"
                    />
                    <div className="flex items-center justify-between text-xs text-[#2E7D32]">
                      <span className="truncate max-w-[200px] font-medium">
                        {selectedFile?.name || 'Selected video'}
                      </span>
                      <span>
                        {selectedFile
                          ? `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`
                          : ''}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500">
                      Click to choose a different video file
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E8F5E9] text-[#1B5E20] mb-2">
                      <FileVideo className="h-6 w-6" />
                    </div>
                    <p className="text-sm font-semibold text-[#1B5E20]">
                      Click to browse or drag & drop video
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Supports MP4, WebM, MOV (Max recommended 100MB)
                    </p>
                  </>
                )}
              </div>
            </div>
          ) : (
            /* Tab 2: Link Input */
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Video URL (YouTube, Vimeo, or Direct .mp4 link) *
                </label>
                <div className="relative">
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="e.g. https://www.youtube.com/watch?v=... or https://example.com/video.mp4"
                    className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-xs text-gray-900 focus:border-[#2E7D32] focus:outline-none focus:ring-1 focus:ring-[#2E7D32]"
                  />
                </div>
                <p className="text-[11px] text-gray-500 mt-1">
                  YouTube shorts, standard videos, and direct video URLs are supported.
                </p>
              </div>

              {urlInput && formatVideoUrl(urlInput).embedUrl && (
                <div className="rounded-xl overflow-hidden border border-gray-200 aspect-video bg-black">
                  <iframe
                    src={formatVideoUrl(urlInput).embedUrl}
                    className="w-full h-full"
                    title="Video Preview"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          )}

          {/* Common Fields */}
          <div className="space-y-3 pt-2">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Video Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Residents Music & Cultural Fellowship"
                className="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-xs text-gray-900 focus:border-[#2E7D32] focus:outline-none focus:ring-1 focus:ring-[#2E7D32]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as VideoItem['category'])}
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 text-xs text-gray-900 focus:border-[#2E7D32] focus:outline-none focus:ring-1 focus:ring-[#2E7D32]"
                >
                  {VIDEO_CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Cover Thumbnail URL (Optional)
                </label>
                <input
                  type="text"
                  value={thumbnailUrl}
                  onChange={(e) => setThumbnailUrl(e.target.value)}
                  placeholder="https://... or leave empty"
                  className="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-xs text-gray-900 focus:border-[#2E7D32] focus:outline-none focus:ring-1 focus:ring-[#2E7D32]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Description
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief summary of activities or message in this video..."
                className="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-xs text-gray-900 focus:border-[#2E7D32] focus:outline-none focus:ring-1 focus:ring-[#2E7D32]"
              />
            </div>
          </div>

          {/* Progress bar */}
          {isProcessing && uploadProgress > 0 && (
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-[#2E7D32] font-semibold">
                <span>Saving video...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-gray-200 overflow-hidden">
                <div
                  className="h-full bg-[#2E7D32] transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isProcessing}
              className="rounded-xl px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="flex items-center gap-2 rounded-xl bg-[#2E7D32] px-5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#1B5E20] transition-colors disabled:opacity-50 cursor-pointer"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  Add Video
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
