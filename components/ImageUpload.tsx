
import React, { useRef } from 'react';
import { UploadIcon, TrashIcon } from './icons';

interface ImageUploadProps {
  label: string;
  onUpload: (url: string | null) => void;
  currentImage: string | null;
  isCompact?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ label, onUpload, currentImage, isCompact = false }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileSelect = () => inputRef.current?.click();

  return (
    <div className={`mb-4 ${isCompact ? 'flex items-center gap-2' : ''}`}>
      {!isCompact && <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>}
      <div className={`flex items-center gap-2 ${isCompact ? 'w-full' : ''}`}>
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          onClick={triggerFileSelect}
          className="flex-grow flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-gray-300 font-semibold py-2 px-4 rounded-md transition-colors"
        >
          <UploadIcon />
          {isCompact ? 'Change' : 'Upload Image'}
        </button>
        {currentImage && (
          <div className="flex items-center gap-2">
            <img src={currentImage} alt="Preview" className="w-10 h-10 object-cover rounded-md bg-gray-500" />
            <button
              onClick={() => onUpload(null)}
              className="p-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors"
              title="Remove Image"
            >
              <TrashIcon />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
