import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Camera, Palette, Home, ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

export function HomePage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Camera,
      title: 'Upload Your Space',
      description: 'Simply capture photos of your four walls and let AI analyze your room.',
    },
    {
      icon: Palette,
      title: 'Personal Preferences',
      description: 'Tell us about your style, colors, and budget preferences.',
    },
    {
      icon: Home,
      title: 'AI-Powered Design',
      description: 'Get personalized recommendations for colors, furniture, and layout.',
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-4 py-2 mb-8 bg-primary-50 dark:bg-primary-900/20 rounded-full">
              <Sparkles className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-2" />
              <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                AI-Powered Interior Design
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              AI-Powered Room Designer for{' '}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Simple People
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Transform your space effortlessly with personalized design recommendations. 
              Upload photos, share your preferences, and get professional-quality room designs in minutes.
            </p>
            
            <Button
              size="lg"
              onClick={() => navigate('/design')}
              icon={ArrowRight}
              className="text-lg px-8 py-4"
            >
              Start Designing
            </Button>
          </motion.div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary-200 dark:bg-primary-800 rounded-full opacity-20 animate-pulse-slow" />
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-secondary-200 dark:bg-secondary-800 rounded-full opacity-20 animate-pulse-slow" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent-200 dark:bg-accent-800 rounded-full opacity-10 animate-pulse-slow" style={{ animationDelay: '2s' }} />
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our AI-powered platform makes interior design accessible to everyone. 
              No experience required – just your vision and our technology.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card hover className="p-8 text-center h-full">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-6">
                    <feature.icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 text-center bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border-none">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to Transform Your Space?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of users who have already redesigned their rooms with RoomGenius. 
                Start your design journey today and see the magic happen.
              </p>
              <Button
                size="lg"
                onClick={() => navigate('/design')}
                icon={Sparkles}
                className="text-lg px-8 py-4"
              >
                Get Started Free
              </Button>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}