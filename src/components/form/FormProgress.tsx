'use client';

import { cn } from "@/lib/utils";

interface Step {
  id: string;
  title: string;
  icon: string;
}

interface FormProgressProps {
  steps: Step[];
  currentStep: number;
}

export function FormProgress({ steps, currentStep }: FormProgressProps) {
  return (
    <div className="mb-8 pt-2 pb-4">
      <div className="relative">
        {/* Progress Line - Adjusted to be in the middle of icons */}
        <div className="absolute top-[28px] left-[28px] right-[28px] h-0.5">
          {/* Background Line */}
          <div className="absolute inset-0 bg-blue-100" />
          
          {/* Active Line */}
          <div 
            className="absolute left-0 top-0 bottom-0 bg-blue-600 transition-all duration-300"
            style={{ 
              width: `${(currentStep / (steps.length - 1)) * 100}%`,
            }}
          />
        </div>

        {/* Steps */}
        <div className="flex justify-between relative">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center">
              <div 
                className={cn(
                  "w-14 h-14 rounded-full flex items-center justify-center text-2xl",
                  "transition-all duration-300",
                  index <= currentStep 
                    ? "bg-blue-600 text-white shadow-md" 
                    : "bg-white text-gray-400 border-2 border-blue-100"
                )}
              >
                {step.icon}
              </div>
              <span className={cn(
                "mt-2 text-sm font-medium transition-colors duration-300",
                index <= currentStep ? "text-blue-600" : "text-gray-400"
              )}>
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 