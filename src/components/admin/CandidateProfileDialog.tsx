import { Candidate } from "@/types/candidate";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
      <DialogContent className="bg-white max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Candidate Profile</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
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

          {/* Diagnoses Section */}
          <section className="bg-gray-50 p-2.5 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-900 mb-1.5">
              Diagnoses & Assessments
            </h3>
            <div className="space-y-3">
              {candidate.diagnoses.map((diagnosis, index) => (
                <div key={index} className="space-y-1">
                  <p className="text-gray-700 text-sm font-medium">
                    {index === 0 ? 'Primary: ' : 'Secondary: '}{diagnosis.type}
                  </p>
                  <div className="grid grid-cols-3 gap-2 pl-4">
                    <p className="text-gray-600 text-xs">
                      Severity: {diagnosis.assessment.symptomSeverity}/5
                    </p>
                    <p className="text-gray-600 text-xs">
                      Long-term: {diagnosis.assessment.symptomFluctuationLongTerm}/5
                    </p>
                    <p className="text-gray-600 text-xs">
                      Short-term: {diagnosis.assessment.symptomFluctuationShortTerm}/5
                    </p>
                  </div>
                </div>
              ))}
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

          {/* Add Personality Section */}
          <section className="bg-gray-50 p-2.5 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-900 mb-1.5">
              Personality Assessment
            </h3>
            <div className="space-y-2">
              {candidate.mbtiType && (
                <p className="text-gray-700 text-sm">
                  MBTI Type: <span className="font-medium">{candidate.mbtiType}</span>
                </p>
              )}
              {candidate.discType && (
                <p className="text-gray-700 text-sm">
                  DISC Type: <span className="font-medium">{candidate.discType}</span>
                </p>
              )}
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
} 