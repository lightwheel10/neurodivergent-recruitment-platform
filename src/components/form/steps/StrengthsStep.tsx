'use client';

import { Checkbox } from "@/components/ui/checkbox";
import type { Candidate } from "@/types/candidate";
import { PREDEFINED_SUPERPOWERS, PREDEFINED_VULNERABILITIES } from "@/types/candidate";
import { cn } from "@/lib/utils";

interface StrengthsStepProps {
  formData: Partial<Candidate>;
  setFormData: (data: Partial<Candidate>) => void;
}

export function StrengthsStep({ formData, setFormData }: StrengthsStepProps) {
  if (!formData.diagnosis1) return null;

  const handleSuperPowerChange = (power: string, checked: boolean) => {
    const powers = formData.superpowers || [];
    setFormData({
      ...formData,
      superpowers: checked 
        ? [...powers, power]
        : powers.filter(p => p !== power)
    });
  };

  const handleVulnerabilityChange = (vulnerability: string, checked: boolean) => {
    const vulnerabilities = formData.vulnerabilities || [];
    setFormData({
      ...formData,
      vulnerabilities: checked
        ? [...vulnerabilities, vulnerability]
        : vulnerabilities.filter(v => v !== vulnerability)
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Your Unique Profile</h2>
        <p className="text-gray-600">Select what best describes you.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-blue-600">Superpowers</h3>
          <div className="space-y-3 bg-blue-50 p-6 rounded-xl">
            {PREDEFINED_SUPERPOWERS[formData.diagnosis1].map(power => (
              <label 
                key={power} 
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg transition-all cursor-pointer",
                  "hover:bg-blue-100/70",
                  formData.superpowers?.includes(power) && "bg-blue-100"
                )}
              >
                <Checkbox
                  id={`power-${power}`}
                  checked={formData.superpowers?.includes(power)}
                  onCheckedChange={(checked) => handleSuperPowerChange(power, checked as boolean)}
                  className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                />
                <span className="text-gray-900 select-none">{power}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-purple-600">Areas of Support</h3>
          <div className="space-y-3 bg-purple-50 p-6 rounded-xl">
            {PREDEFINED_VULNERABILITIES[formData.diagnosis1].map(vulnerability => (
              <label 
                key={vulnerability} 
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg transition-all cursor-pointer",
                  "hover:bg-purple-100/70",
                  formData.vulnerabilities?.includes(vulnerability) && "bg-purple-100"
                )}
              >
                <Checkbox
                  id={`vulnerability-${vulnerability}`}
                  checked={formData.vulnerabilities?.includes(vulnerability)}
                  onCheckedChange={(checked) => handleVulnerabilityChange(vulnerability, checked as boolean)}
                  className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                />
                <span className="text-gray-900 select-none">{vulnerability}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 