import React from 'react';
import { motion } from 'framer-motion';
import { RoomImage, PersonalPreferences } from '../../types';
import { Card } from '../ui/Card';
import { COLOR_OPTIONS } from '../../constants';

interface ReviewStepProps {
  images: RoomImage[];
  preferences: PersonalPreferences;
}

export function ReviewStep({ images, preferences }: ReviewStepProps) {
  const getColorName = (value: string) => {
    const color = COLOR_OPTIONS.find(c => c.value === value);
    return color?.name || value;
  };

  const getBudgetLabel = (value: number) => {
    if (value <= 1000) return '$500 - $1,000';
    if (value <= 2500) return '$1,000 - $2,500';
    if (value <= 5000) return '$2,500 - $5,000';
    if (value <= 10000) return '$5,000 - $10,000';
    if (value <= 25000) return '$10,000 - $25,000';
    return '$25,000+';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Review Your Information
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Please review your uploaded images and preferences before generating your design plan.
        </p>
      </div>

      {/* Images Review */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Room Images
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={image.wall} className="space-y-2">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                {image.preview ? (
                  <img
                    src={image.preview}
                    alt={`Wall ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No image
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                {image.wall.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Preferences Review */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Personal Information
          </h3>
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Name:</span>
              <p className="text-gray-900 dark:text-white">{preferences.fullName}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Room Type:</span>
              <p className="text-gray-900 dark:text-white">{preferences.roomType}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Personality:</span>
              <p className="text-gray-900 dark:text-white">{preferences.personalityType}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Budget:</span>
              <p className="text-gray-900 dark:text-white">{getBudgetLabel(preferences.budgetRange)}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Favorite Colors
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {preferences.favoriteColors?.map((colorValue) => {
              const color = COLOR_OPTIONS.find(c => c.value === colorValue);
              return (
                <div key={colorValue} className="flex items-center space-x-3">
                  <div
                    className="w-6 h-6 rounded-full border border-gray-200 dark:border-gray-600"
                    style={{ backgroundColor: color?.hex }}
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {getColorName(colorValue)}
                  </span>
                </div>
              );
            }) || <p className="text-gray-500">No colors selected</p>}
          </div>
        </Card>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <div>
            <h4 className="font-medium text-yellow-900 dark:text-yellow-100 mb-1">
              Ready to Generate Your Design?
            </h4>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              Our AI will analyze your images and preferences to create a personalized design plan. 
              This process typically takes 2-3 minutes.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}