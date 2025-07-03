import { useState } from 'react';

/**
 * useImageUpload
 * Custom hook to handle image selection, preview, and uploading.
 *
 * @param {Object}   options
 * @param {string}   options.uploadEndpoint  URL of the backend endpoint that processes uploads
 * @param {Function} [options.onUploadSuccess] Optional callback invoked with uploaded image data
 *
 * @returns {Object}
 * {
 *   file,               // File object selected by the user
 *   previewUrl,         // Local preview URL (object URL) for immediate display
 *   imageUrl,           // Final URL returned by server after upload
 *   uploading,          // Boolean indicating upload in progress
 *   error,              // Error message (if any)
 *   handleFileChange,   // Handler to attach to <input type="file">
 *   uploadImage,        // Function to initiate upload to server
 *   clearImage,         // Function to reset all state (file, preview, imageUrl, error)
 * }
 */
const useImageUpload = ({ uploadEndpoint, onUploadSuccess } = {}) => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  /**
   * handleFileChange
   * Call this onChange of a <input type="file"> to store file & generate preview.
   */
  const handleFileChange = (e) => {
    setError('');
    const selected = e.target.files && e.target.files[0];
    if (!selected) return;

    // Optional: validate file type
    if (!selected.type.startsWith('image/')) {
      setError('Please select a valid image file.');
      return;
    }

    setFile(selected);
    const localUrl = URL.createObjectURL(selected);
    setPreviewUrl(localUrl);
  };

  /**
   * uploadImage
   * Sends the selected file to the backend. Expects JSON response with { imageUrl }.
   */
  const uploadImage = async () => {
    if (!file) {
      setError('No file selected to upload.');
      return null;
    }
    if (!uploadEndpoint) {
      setError('No upload endpoint specified.');
      return null;
    }

    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch(uploadEndpoint, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Image upload failed');
      }

      const data = await res.json();
      const finalUrl = data.imageUrl || data.url || '';
      if (!finalUrl) {
        throw new Error('No imageUrl returned from server.');
      }

      setImageUrl(finalUrl);
      setUploading(false);
      if (typeof onUploadSuccess === 'function') {
        onUploadSuccess(finalUrl);
      }
      return finalUrl;
    } catch (err) {
      console.error('useImageUpload error:', err);
      setError(err.message || 'Upload failed');
      setUploading(false);
      return null;
    }
  };

  /**
   * clearImage
   * Resets all state values (file, preview, imageUrl, error).
   */
  const clearImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setFile(null);
    setPreviewUrl('');
    setImageUrl('');
    setError('');
    setUploading(false);
  };

  return {
    file,
    previewUrl,
    imageUrl,
    uploading,
    error,
    handleFileChange,
    uploadImage,
    clearImage,
  };
};

export default useImageUpload;
