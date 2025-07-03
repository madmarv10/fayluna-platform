import React, { useState } from "react";

const ImageUpload = ({ onImageSelect }) => {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onImageSelect(file);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
      onImageSelect(null);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Upload Image
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="block w-full text-sm text-gray-600"
      />
      {preview && (
        <div className="mt-2">
          <img
            src={preview}
            alt="Preview"
            className="max-h-40 rounded-lg border border-gray-300"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
