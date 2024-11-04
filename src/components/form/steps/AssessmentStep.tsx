'use client';

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import type { Candidate } from "@/types/candidate";

interface AssessmentStepProps {
  formData: Partial<Candidate>;
  setFormData: (data: Partial<Candidate>) => void;
}

export function AssessmentStep({ formData, setFormData }: AssessmentStepProps) {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 p-4 sm:p-6">
      <div className="space-y-2 sm:space-y-3">
        <h2 className="text-lg sm:text-2xl font-bold text-gray-900">Symptom Assessment</h2>
        <p className="text-sm sm:text-base text-gray-600">Help us understand your experience better.</p>
      </div>
      <div className="space-y-8 sm:space-y-12">
        {[
          { key: 'symptomSeverity', label: 'Symptom Severity' },
          { key: 'symptomFluctuationLongTerm', label: 'Symptom Fluctuation Long Term' },
          { key: 'symptomFluctuationShortTerm', label: 'Symptom Fluctuation Short Term' }
        ].map((scale) => (
          <div key={scale.key} className="space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4">
              <Label className="text-sm sm:text-lg text-gray-700">
                {scale.label}
              </Label>
              <span className="text-sm sm:text-lg font-medium text-blue-600 bg-blue-50 px-3 sm:px-4 py-1 rounded-full w-fit">
                {(formData[scale.key as keyof Candidate] as number)?.toString() || '1'}
              </span>
            </div>
            <div className="pt-1 sm:pt-2">
              <Slider
                min={1}
                max={5}
                step={1}
                value={[Number(formData[scale.key as keyof Candidate]) || 1]}
                onValueChange={(value) => setFormData({ ...formData, [scale.key]: value[0] })}
                className="w-full"
              />
            </div>
            <div className="flex justify-between text-xs sm:text-sm font-medium pt-1 sm:pt-2">
              <span className="text-gray-600">Mild</span>
              <span className="text-gray-600">Moderate</span>
              <span className="text-gray-600">Severe</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 