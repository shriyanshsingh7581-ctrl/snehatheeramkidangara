/**
 * Cloudinary Direct Upload Service
 * Cloud Name: dxeuzdwkz
 * Upload Preset: Photos
 */

export const CLOUDINARY_CONFIG = {
  cloudName: 'dxeuzdwkz',
  uploadPreset: 'Photos',
  uploadEndpoint: 'https://api.cloudinary.com/v1_1/dxeuzdwkz/image/upload',
};

export interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
  created_at: string;
}

/**
 * Uploads an image file directly to Cloudinary using the unsigned preset "Photos"
 */
export async function uploadImageToCloudinary(
  file: File,
  onProgress?: (percentage: number) => void
): Promise<string> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);

    xhr.open('POST', CLOUDINARY_CONFIG.uploadEndpoint, true);

    if (xhr.upload && onProgress) {
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          onProgress(percent);
        }
      };
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response: CloudinaryUploadResponse = JSON.parse(xhr.responseText);
          if (response.secure_url) {
            resolve(response.secure_url);
          } else {
            reject(new Error('No secure_url returned by Cloudinary'));
          }
        } catch {
          reject(new Error('Failed to parse Cloudinary response'));
        }
      } else {
        try {
          const errData = JSON.parse(xhr.responseText);
          reject(new Error(errData?.error?.message || `Upload failed with status ${xhr.status}`));
        } catch {
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      }
    };

    xhr.onerror = () => {
      reject(new Error('Network error during Cloudinary image upload'));
    };

    xhr.send(formData);
  });
}
