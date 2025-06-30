import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, RefreshCw, Palette, DollarSign, Home, Lightbulb } from 'lucide-react';
import { DesignPlan, PersonalPreferences } from '../types';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

export function ResultsPage() {
  const navigate = useNavigate();
  const [designPlan, setDesignPlan] = useState<DesignPlan | null>(null);
  const [preferences, setPreferences] = useState<PersonalPreferences | null>(null);

  useEffect(() => {
    // Retrieve design plan and preferences from sessionStorage
    const storedPlan = sessionStorage.getItem('designPlan');
    const storedPreferences = sessionStorage.getItem('userPreferences');
    
    if (storedPlan && storedPreferences) {
      setDesignPlan(JSON.parse(storedPlan));
      setPreferences(JSON.parse(storedPreferences));
    } else {
      // Redirect to design wizard if no data found
      navigate('/design');
    }
  }, [navigate]);

  const handleDownloadPDF = () => {
    // Mock PDF download functionality
    // In production, this would generate and download an actual PDF
    const element = document.createElement('a');
    const file = new Blob(['Design Plan PDF content would go here'], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${preferences?.fullName?.replace(/\s+/g, '_')}_Design_Plan.pdf`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleStartAgain = () => {
    // Clear stored data and navigate to home
    sessionStorage.removeItem('designPlan');
    sessionStorage.removeItem('userPreferences');
    navigate('/');
  };

  if (!designPlan || !preferences) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300">Loading your design plan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Your Personalized Design Plan
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Based on your {preferences.personalityType.toLowerCase()} style and {preferences.roomType.toLowerCase()} preferences
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          <Button
            onClick={handleDownloadPDF}
            icon={Download}
            variant="primary"
          >
            Download Plan as PDF
          </Button>
          <Button
            onClick={handleStartAgain}
            icon={RefreshCw}
            variant="outline"
          >
            Start Again
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Wall Colors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="p-6">
              <div className="flex items-center mb-6">
                <Palette className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-3" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Recommended Wall Colors
                </h2>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {designPlan.wallColors.map((color, index) => (
                  <div key={index} className="text-center">
                    <div
                      className="w-full h-24 rounded-lg mb-3 border border-gray-200 dark:border-gray-600"
                      style={{ backgroundColor: color.hex }}
                    />
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {color.color}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {color.name}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Cost Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6">
              <div className="flex items-center mb-6">
                <DollarSign className="w-6 h-6 text-green-600 mr-3" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Cost Summary
                </h2>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Furniture</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ${designPlan.costBreakdown.furniture.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Paint</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ${designPlan.costBreakdown.paint.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Accessories</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ${designPlan.costBreakdown.accessories.toLocaleString()}
                  </span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">Total</span>
                    <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                      ${designPlan.totalCost.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Furniture Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <Card className="p-6">
            <div className="flex items-center mb-6">
              <Home className="w-6 h-6 text-secondary-600 dark:text-secondary-400 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Suggested Furniture
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {designPlan.furniture.map((item) => (
                <div key={item.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {item.name}
                    </h3>
                    <span className="text-sm px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-gray-600 dark:text-gray-300">
                      {item.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    {item.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-primary-600 dark:text-primary-400">
                      ${item.cost.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Layout Recommendation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <Card className="p-6">
            <div className="flex items-center mb-6">
              <Lightbulb className="w-6 h-6 text-accent-600 dark:text-accent-400 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Layout Recommendation
              </h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {designPlan.layoutRecommendation}
            </p>
          </Card>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <Card className="p-8 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border-none">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Love Your New Design?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Your personalized room design is ready to bring to life! Download your complete plan 
              and start shopping for your perfect space.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                onClick={handleDownloadPDF}
                icon={Download}
                size="lg"
              >
                Download Complete Plan
              </Button>
              <Button
                onClick={handleStartAgain}
                variant="outline"
                size="lg"
              >
                Design Another Room
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}