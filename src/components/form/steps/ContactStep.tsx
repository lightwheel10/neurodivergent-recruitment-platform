'use client';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Candidate } from "@/types/candidate";

interface ContactStepProps {
  formData: Partial<Candidate>;
  setFormData: (data: Partial<Candidate>) => void;
}

export function ContactStep({ formData, setFormData }: ContactStepProps) {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 p-4 sm:p-6">
      <div className="space-y-2">
        <h2 className="text-lg sm:text-2xl font-bold text-gray-900">Welcome! Let&apos;s get started</h2>
        <p className="text-sm sm:text-base text-gray-600">First, tell us how to reach you.</p>
      </div>
      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-sm sm:text-base text-gray-700">
            Full Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            type="text"
            required
            placeholder="John Doe"
            className="mt-1.5 h-10 sm:h-12 text-sm sm:text-base text-gray-900 placeholder:text-gray-500"
            value={formData.name || ''}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="age" className="text-sm sm:text-base text-gray-700">Age</Label>
          <Input
            id="age"
            type="number"
            required
            min="16"
            max="100"
            placeholder="25"
            className="mt-1.5 h-10 sm:h-12 text-sm sm:text-base text-gray-900 placeholder:text-gray-500"
            value={formData.age || ''}
            onChange={e => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
          />
        </div>
        <div>
          <Label htmlFor="email" className="text-sm sm:text-base text-gray-700">
            Email Address <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            required
            placeholder="you@example.com"
            className="mt-1.5 h-10 sm:h-12 text-sm sm:text-base text-gray-900 placeholder:text-gray-500"
            value={formData.email || ''}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="phone" className="text-sm sm:text-base text-gray-700">Phone Number (Optional)</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            className="mt-1.5 h-10 sm:h-12 text-sm sm:text-base text-gray-900 placeholder:text-gray-500"
            value={formData.phoneNumber || ''}
            onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
} 