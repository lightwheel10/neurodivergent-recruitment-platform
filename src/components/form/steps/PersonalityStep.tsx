'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Candidate, MBTIType, DISCType } from "@/types/candidate";

interface PersonalityStepProps {
  formData: Partial<Candidate>;
  setFormData: (data: Partial<Candidate>) => void;
}

export function PersonalityStep({ formData, setFormData }: PersonalityStepProps) {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 p-4 sm:p-6">
      <div className="space-y-2 sm:space-y-3">
        <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
          Personality Assessment
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          Help us understand your personality type better.
        </p>
      </div>

      <div className="space-y-8">
        <div className="relative">
          <Label className="text-sm sm:text-base text-gray-700 mb-1.5 block">
            MBTI Type
          </Label>
          <Select
            value={formData.mbtiType}
            onValueChange={(value) => setFormData({ ...formData, mbtiType: value as MBTIType })}
          >
            <SelectTrigger className="h-10 sm:h-12 text-sm sm:text-base text-gray-900 bg-white relative z-10">
              <SelectValue placeholder="Select your MBTI type" />
            </SelectTrigger>
            <SelectContent 
              className="bg-white border shadow-lg z-50" 
              position="popper"
              sideOffset={5}
            >
              <div className="max-h-[200px] overflow-y-auto">
                {[
                  'ISTJ', 'ISFJ', 'INFJ', 'INTJ',
                  'ISTP', 'ISFP', 'INFP', 'INTP',
                  'ESTP', 'ESFP', 'ENFP', 'ENTP',
                  'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'
                ].map((type) => (
                  <SelectItem 
                    key={type} 
                    value={type}
                    className="text-sm sm:text-base text-gray-900 p-2 hover:bg-gray-50 cursor-pointer"
                  >
                    {type}
                  </SelectItem>
                ))}
              </div>
            </SelectContent>
          </Select>
        </div>

        <div className="relative">
          <Label className="text-sm sm:text-base text-gray-700 mb-1.5 block">
            DISC Type
          </Label>
          <Select
            value={formData.discType}
            onValueChange={(value) => setFormData({ ...formData, discType: value as DISCType })}
          >
            <SelectTrigger className="h-10 sm:h-12 text-sm sm:text-base text-gray-900 bg-white relative z-10">
              <SelectValue placeholder="Select your DISC type" />
            </SelectTrigger>
            <SelectContent 
              className="bg-white border shadow-lg z-50"
              position="popper"
              sideOffset={5}
            >
              {[
                { value: 'D', label: 'Dominance' },
                { value: 'I', label: 'Influence' },
                { value: 'S', label: 'Steadiness' },
                { value: 'C', label: 'Conscientiousness' }
              ].map((type) => (
                <SelectItem 
                  key={type.value} 
                  value={type.value}
                  className="text-sm sm:text-base text-gray-900 p-2 hover:bg-gray-50 cursor-pointer"
                >
                  {type.value} - {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
} 