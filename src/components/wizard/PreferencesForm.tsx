import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { PersonalPreferences } from '../../types';
import { PERSONALITY_TYPES, ROOM_TYPES, COLOR_OPTIONS, BUDGET_RANGES } from '../../constants';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Card } from '../ui/Card';

interface PreferencesFormProps {
  preferences: PersonalPreferences;
  onPreferencesChange: (preferences: PersonalPreferences) => void;
  errors: { [key: string]: string };
}

export function PreferencesForm({ preferences, onPreferencesChange, errors }: PreferencesFormProps) {
  const handleInputChange = (field: keyof PersonalPreferences, value: any) => {
    onPreferencesChange({ ...preferences, [field]: value });
  };

  const handleColorToggle = (colorValue: string) => {
    const currentColors = preferences.favoriteColors || [];
    const updatedColors = currentColors.includes(colorValue)
      ? currentColors.filter(c => c !== colorValue)
      : [...currentColors, colorValue];
    
    handleInputChange('favoriteColors', updatedColors);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Tell Us About Your Style
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Share your preferences so we can create the perfect design for you.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="space-y-4">
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              value={preferences.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              error={errors.fullName}
              required
            />

            <Select
              label="Room Type"
              placeholder="Select room type"
              value={preferences.roomType}
              onChange={(e) => handleInputChange('roomType', e.target.value)}
              error={errors.roomType}
              required
              options={ROOM_TYPES.map(type => ({ value: type, label: type }))}
            />

            <Select
              label="Personality Type"
              placeholder="What describes your style?"
              value={preferences.personalityType}
              onChange={(e) => handleInputChange('personalityType', e.target.value)}
              error={errors.personalityType}
              required
              options={PERSONALITY_TYPES.map(type => ({ value: type, label: type }))}
            />
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Budget Range <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                {BUDGET_RANGES.map((range, index) => (
                  <label key={index} className="flex items-center">
                    <input
                      type="radio"
                      name="budget"
                      value={range.max}
                      checked={preferences.budgetRange === range.max}
                      onChange={(e) => handleInputChange('budgetRange', parseInt(e.target.value))}
                      className="mr-3 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {range.label}
                    </span>
                  </label>
                ))}
              </div>
              {errors.budgetRange && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                  {errors.budgetRange}
                </p>
              )}
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
            Favorite Colors <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {COLOR_OPTIONS.map((color) => (
              <button
                key={color.value}
                type="button"
                onClick={() => handleColorToggle(color.value)}
                className={`relative p-3 rounded-lg border-2 transition-all duration-200 ${
                  preferences.favoriteColors?.includes(color.value)
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
              >
                <div
                  className="w-full h-8 rounded mb-2"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  {color.name}
                </span>
                {preferences.favoriteColors?.includes(color.value) && (
                  <div className="absolute top-1 right-1 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
          {errors.favoriteColors && (
            <p className="text-sm text-red-600 dark:text-red-400 mt-2">
              {errors.favoriteColors}
            </p>
          )}
        </div>
      </Card>
    </motion.div>
  );
}