'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createCandidate } from '@/lib/firebase/candidate-service';
import type { Candidate } from '@/types/candidate';
import { FormProgress } from './form/FormProgress';
import { ContactStep } from './form/steps/ContactStep';
import { DiagnosisStep } from './form/steps/DiagnosisStep';
import { AssessmentStep } from './form/steps/AssessmentStep';
import { StrengthsStep } from './form/steps/StrengthsStep';
import { cn } from "@/lib/utils";
import confetti from 'canvas-confetti';

const steps = [
  { id: 'contact', title: 'Contact Info', icon: '👋' },
  { id: 'diagnosis', title: 'Diagnosis', icon: '🔍' },
  { id: 'assessment', title: 'Assessment', icon: '📊' },
  { id: 'strengths', title: 'Strengths', icon: '💪' }
];

export function CandidateForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<Partial<Candidate>>({
    superpowers: [],
    vulnerabilities: [],
    diagnoses: [],
  });

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      return;
    }
    
    setIsSubmitting(true);
    try {
      if (!formData.name || !formData.email || !formData.diagnoses?.length) {
        throw new Error('Please fill in all required fields');
      }

      await createCandidate(formData as Omit<Candidate, 'id' | 'createdAt'>);
      setIsSuccess(true);
      triggerConfetti();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(error instanceof Error ? error.message : 'Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDiagnosisChange = () => {
    // DiagnosisStep component handles the diagnoses array updates directly
  };

  if (isSuccess) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <Card className="border-0 shadow-lg rounded-3xl overflow-hidden bg-white">
          <div className="p-10 text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center">
              <svg 
                className="w-10 h-10 text-green-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Application Submitted!</h2>
            <p className="text-gray-600 max-w-md mx-auto">
              Thank you for taking the first step towards finding a workplace that values your unique perspective. We&apos;ll be in touch soon!
            </p>
            <Button
              onClick={() => window.location.href = '/'}
              className={cn(
                "mt-8 px-8 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white",
                "hover:from-indigo-700 hover:to-blue-700 shadow-md hover:shadow-lg",
                "transition-all duration-200 rounded-xl"
              )}
            >
              Return Home
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-12">
        <FormProgress steps={steps} currentStep={currentStep} />
      </div>

      <Card className="border-0 shadow-lg rounded-3xl overflow-hidden bg-white">
        <form onSubmit={handleSubmit} className="p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ 
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1]
              }}
              className="min-h-[400px] flex flex-col justify-between relative"
            >
              <div className="flex-1">
                {currentStep === 0 && (
                  <ContactStep formData={formData} setFormData={setFormData} />
                )}

                {currentStep === 1 && (
                  <DiagnosisStep 
                    formData={formData} 
                    onDiagnosisChange={handleDiagnosisChange}
                    setFormData={setFormData}
                  />
                )}

                {currentStep === 2 && (
                  <AssessmentStep formData={formData} setFormData={setFormData} />
                )}

                {currentStep === 3 && (
                  <StrengthsStep formData={formData} setFormData={setFormData} />
                )}
              </div>

              <motion.div 
                className="mt-12 flex justify-between items-center pt-8 border-t"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {currentStep > 0 ? (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setCurrentStep(prev => prev - 1)}
                    className="text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 transition-all duration-200"
                  >
                    ← Back
                  </Button>
                ) : (
                  <div></div>
                )}
                
                <Button
                  type="submit"
                  className={cn(
                    "relative px-8 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white",
                    "hover:from-indigo-700 hover:to-blue-700 shadow-md hover:shadow-lg",
                    "transition-all duration-200 rounded-xl",
                    isSubmitting && "opacity-50 cursor-not-allowed"
                  )}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5"
                      >
                        <svg className="animate-spin" viewBox="0 0 24 24">
                          <circle 
                            className="opacity-25" 
                            cx="12" cy="12" r="10" 
                            stroke="currentColor" 
                            strokeWidth="4" 
                            fill="none" 
                          />
                          <path 
                            className="opacity-75" 
                            fill="currentColor" 
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" 
                          />
                        </svg>
                      </motion.div>
                      Processing...
                    </div>
                  ) : (
                    <span className="flex items-center gap-2">
                      {currentStep === steps.length - 1 ? (
                        <>Submit Application <span aria-hidden="true">→</span></>
                      ) : (
                        <>Continue <span aria-hidden="true">→</span></>
                      )}
                    </span>
                  )}
                </Button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </form>
      </Card>
    </div>
  );
} 