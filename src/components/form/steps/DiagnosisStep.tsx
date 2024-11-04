'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Candidate, DiagnosisType } from "@/types/candidate";

interface DiagnosisStepProps {
  formData: Partial<Candidate>;
  onDiagnosisChange: (value: DiagnosisType, field: 'diagnosis1' | 'diagnosis2') => void;
}

export function DiagnosisStep({ formData, onDiagnosisChange }: DiagnosisStepProps) {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 p-4 sm:p-6">
      <div className="space-y-3">
        <h2 className="text-lg sm:text-2xl font-bold text-gray-900">Your Diagnosis</h2>
        <p className="text-sm sm:text-base text-gray-600">Help us understand your unique perspective.</p>
      </div>
      <div className="space-y-4 sm:space-y-6">
        <div className="relative">
          <Label className="text-sm sm:text-base text-gray-700 mb-1.5 block">
            Primary Diagnosis
          </Label>
          <Select
            value={formData.diagnosis1}
            onValueChange={(value) => onDiagnosisChange(value as DiagnosisType, 'diagnosis1')}
          >
            <SelectTrigger className="h-10 sm:h-12 text-sm sm:text-base text-gray-900 bg-white relative z-20">
              <SelectValue placeholder="Select your primary diagnosis" />
            </SelectTrigger>
            <SelectContent 
              className="bg-white border shadow-lg z-50 max-h-[250px] sm:max-h-[300px] overflow-y-auto" 
              position="popper"
              sideOffset={5}
            >
              <SelectItem value="Bipolar" className="text-sm sm:text-base text-gray-900 p-2 hover:bg-gray-50">
                Bipolar
              </SelectItem>
              <SelectItem value="ADHD" className="text-sm sm:text-base text-gray-900 p-2 hover:bg-gray-50">
                ADHD
              </SelectItem>
              <SelectItem value="PTSD" className="text-sm sm:text-base text-gray-900 p-2 hover:bg-gray-50">
                PTSD
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="relative">
          <Label className="text-sm sm:text-base text-gray-700 mb-1.5 block">
            Secondary Diagnosis (Optional)
          </Label>
          <Select
            value={formData.diagnosis2}
            onValueChange={(value) => onDiagnosisChange(value as DiagnosisType, 'diagnosis2')}
          >
            <SelectTrigger className="h-10 sm:h-12 text-sm sm:text-base text-gray-900 bg-white relative z-20">
              <SelectValue placeholder="Select secondary diagnosis (if any)" />
            </SelectTrigger>
            <SelectContent 
              className="bg-white border shadow-lg z-50 max-h-[250px] sm:max-h-[300px] overflow-y-auto" 
              position="popper"
              sideOffset={5}
            >
              <SelectItem value="Bipolar" className="text-sm sm:text-base text-gray-900 p-2 hover:bg-gray-50">
                Bipolar
              </SelectItem>
              <SelectItem value="ADHD" className="text-sm sm:text-base text-gray-900 p-2 hover:bg-gray-50">
                ADHD
              </SelectItem>
              <SelectItem value="PTSD" className="text-sm sm:text-base text-gray-900 p-2 hover:bg-gray-50">
                PTSD
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}