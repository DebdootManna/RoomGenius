import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Camera } from 'lucide-react';
import { RoomImage } from '../../types';
import { Card } from '../ui/Card';

interface ImageUploadProps {
  images: RoomImage[];
  onImagesChange: (images: RoomImage[]) => void;
  errors: { [key: string]: string };
}

export function ImageUpload({ images, onImagesChange, errors }: ImageUploadProps) {
  const handleFileChange = useCallback((wallId: string, file: File | null) => {
    const updatedImages = images.map(img => {
      if (img.wall === wallId) {
        return {
          ...img,
          file,
          preview: file ? URL.createObjectURL(file) : null,
        };
      }
      return img;
    });
    onImagesChange(updatedImages);
  }, [images, onImagesChange]);

  const removeImage = useCallback((wallId: string) => {
    handleFileChange(wallId, null);
  }, [handleFileChange]);

  const wallLabels = {
    'wall-1': 'Front Wall',
    'wall-2': 'Right Wall', 
    'wall-3': 'Back Wall',
    'wall-4': 'Left Wall',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Upload Your Room Images
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Please upload photos of all four walls of your room. This helps our AI understand your space better.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {images.map((image) => (
          <Card key={image.wall} className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {wallLabels[image.wall]}
                </h3>
                <span className="text-sm text-red-500">Required</span>
              </div>

              {image.preview ? (
                <div className="relative">
                  <img
                    src={image.preview}
                    alt={`${wallLabels[image.wall]} preview`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removeImage(image.wall)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="block">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      handleFileChange(image.wall, file);
                    }}
                    className="hidden"
                  />
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-primary-500 dark:hover:border-primary-400 transition-colors cursor-pointer">
                    <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-sm text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </label>
              )}

              {errors[image.wall] && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errors[image.wall]}
                </p>
              )}
            </div>
          </Card>
        ))}
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-start">
          <Upload className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
              Photo Tips for Best Results
            </h4>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• Take photos in good lighting conditions</li>
              <li>• Capture the entire wall from corner to corner</li>
              <li>• Keep the camera level and steady</li>
              <li>• Avoid shadows and reflections when possible</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}