import { Candidate } from "@/types/candidate";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface CandidateProfileDialogProps {
  candidate: Candidate;
}

export function CandidateProfileDialog({ candidate }: CandidateProfileDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-blue-600 hover:text-blue-700"
        >
          <Eye className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-white [&>button]:hidden">
        <DialogHeader className="space-y-1 pb-2 border-b">
          <DialogTitle className="text-lg font-bold text-gray-900">
            Candidate Details
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Review the candidate&apos;s information below.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-3 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {/* Personal Information */}
            <section className="bg-gray-50 p-2.5 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-900 mb-1.5">
                Personal Information
              </h3>
              <div className="space-y-0.5">
                <p className="text-gray-700 text-sm">
                  <span className="font-medium">Name:</span> {candidate.name}
                </p>
                <p className="text-gray-700 text-sm">
                  <span className="font-medium">Age:</span> {candidate.age}
                </p>
              </div>
            </section>

            {/* Contact Information */}
            <section className="bg-gray-50 p-2.5 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-900 mb-1.5">
                Contact Information
              </h3>
              <div className="space-y-0.5">
                <p className="text-gray-700 text-sm">
                  <span className="font-medium">Email:</span> {candidate.email}
                </p>
                <p className="text-gray-700 text-sm">
                  <span className="font-medium">Phone:</span> {candidate.phoneNumber || 'Not provided'}
                </p>
              </div>
            </section>
          </div>

          {/* Diagnosis */}
          <section className="bg-gray-50 p-2.5 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-900 mb-1.5">
              Diagnosis
            </h3>
            <div className="space-y-0.5">
              <p className="text-gray-700 text-sm">
                <span className="font-medium">Primary:</span> {candidate.diagnosis1}
              </p>
              {candidate.diagnosis2 && (
                <p className="text-gray-700 text-sm">
                  <span className="font-medium">Secondary:</span> {candidate.diagnosis2}
                </p>
              )}
            </div>
          </section>

          {/* Assessment Scores */}
          <section className="bg-gray-50 p-2.5 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-900 mb-1.5">
              Assessment Scores
            </h3>
            <div className="grid grid-cols-3 gap-2">
              <p className="text-gray-700 text-sm">
                <span className="font-medium">Severity:</span> {candidate.symptomSeverity}/5
              </p>
              <p className="text-gray-700 text-sm">
                <span className="font-medium">Long-term:</span> {candidate.symptomFluctuationLongTerm}/5
              </p>
              <p className="text-gray-700 text-sm">
                <span className="font-medium">Short-term:</span> {candidate.symptomFluctuationShortTerm}/5
              </p>
            </div>
          </section>

          <div className="grid grid-cols-2 gap-3">
            {/* Superpowers */}
            <section className="bg-gray-50 p-2.5 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-900 mb-1.5">
                Superpowers
              </h3>
              <ul className="space-y-0.5">
                {candidate.superpowers.map((power) => (
                  <li key={power} className="flex items-center gap-1.5 text-sm text-gray-700">
                    <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                    {power}
                  </li>
                ))}
              </ul>
            </section>

            {/* Areas of Support */}
            <section className="bg-gray-50 p-2.5 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-900 mb-1.5">
                Areas of Support
              </h3>
              <ul className="space-y-0.5">
                {candidate.vulnerabilities.map((vulnerability) => (
                  <li key={vulnerability} className="flex items-center gap-1.5 text-sm text-gray-700">
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    {vulnerability}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 