import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { RoomImage, PersonalPreferences, WizardStep } from '../../types';
import { generateDesignPlan } from '../../utils/api';
import { ImageUpload } from './ImageUpload';
import { PreferencesForm } from './PreferencesForm';
import { ReviewStep } from './ReviewStep';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';

const initialImages: RoomImage[] = [
  { id: '1', file: null, preview: null, wall: 'wall-1' },
  { id: '2', file: null, preview: null, wall: 'wall-2' },
  { id: '3', file: null, preview: null, wall: 'wall-3' },
  { id: '4', file: null, preview: null, wall: 'wall-4' },
];

const initialPreferences: PersonalPreferences = {
  fullName: '',
  personalityType: '',
  favoriteColors: [],
  budgetRange: 0,
  roomType: '',
};

export function DesignWizard() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<WizardStep>('upload');
  const [images, setImages] = useState<RoomImage[]>(initialImages);
  const [preferences, setPreferences] = useState<PersonalPreferences>(initialPreferences);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const steps: WizardStep[] = ['upload', 'preferences', 'review'];
  const currentStepIndex = steps.indexOf(currentStep);

  const validateStep = useCallback((step: WizardStep): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (step === 'upload') {
      images.forEach((image) => {
        if (!image.file) {
          newErrors[image.wall] = 'Please upload an image for this wall';
        }
      });
    }

    if (step === 'preferences') {
      if (!preferences.fullName.trim()) {
        newErrors.fullName = 'Full name is required';
      }
      if (!preferences.roomType) {
        newErrors.roomType = 'Room type is required';
      }
      if (!preferences.personalityType) {
        newErrors.personalityType = 'Personality type is required';
      }
      if (!preferences.budgetRange) {
        newErrors.budgetRange = 'Budget range is required';
      }
      if (!preferences.favoriteColors || preferences.favoriteColors.length === 0) {
        newErrors.favoriteColors = 'Please select at least one favorite color';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [images, preferences]);

  const handleNext = useCallback(() => {
    if (validateStep(currentStep)) {
      const nextIndex = currentStepIndex + 1;
      if (nextIndex < steps.length) {
        setCurrentStep(steps[nextIndex]);
      }
    }
  }, [currentStep, currentStepIndex, steps, validateStep]);

  const handlePrevious = useCallback(() => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex]);
    }
  }, [currentStepIndex, steps]);

  const handleSubmit = useCallback(async () => {
    if (!validateStep('review')) return;

    setIsLoading(true);
    try {
      const designPlan = await generateDesignPlan({
        images,
        preferences,
      });
      
      // Store the design plan in sessionStorage for the results page
      sessionStorage.setItem('designPlan', JSON.stringify(designPlan));
      sessionStorage.setItem('userPreferences', JSON.stringify(preferences));
      
      navigate('/results');
    } catch (error) {
      console.error('Failed to generate design plan:', error);
      // Handle error - could show a toast or error message
    } finally {
      setIsLoading(false);
    }
  }, [images, preferences, navigate, validateStep]);

  const renderStep = () => {
    switch (currentStep) {
      case 'upload':
        return (
          <ImageUpload
            images={images}
            onImagesChange={setImages}
            errors={errors}
          />
        );
      case 'preferences':
        return (
          <PreferencesForm
            preferences={preferences}
            onPreferencesChange={setPreferences}
            errors={errors}
          />
        );
      case 'review':
        return (
          <ReviewStep
            images={images}
            preferences={preferences}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <ProgressBar
            currentStep={currentStepIndex + 1}
            totalSteps={steps.length}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStepIndex === 0}
            icon={ArrowLeft}
          >
            Previous
          </Button>

          <div className="flex space-x-4">
            {currentStep === 'review' ? (
              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                loading={isLoading}
                icon={isLoading ? Loader2 : undefined}
                className="px-8"
              >
                {isLoading ? 'Generating Design...' : 'Generate Design Plan'}
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                icon={ArrowRight}
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}