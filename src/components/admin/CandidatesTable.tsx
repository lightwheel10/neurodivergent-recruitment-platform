'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  Trash2, 
  ChevronLeft, 
  ChevronRight,
} from 'lucide-react';
import type { Candidate } from '@/types/candidate';
import { CandidateProfileDialog } from "./CandidateProfileDialog";
import { cn } from "@/lib/utils";

interface CandidatesTableProps {
  candidates: Candidate[];
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onConfirm: (id: string) => void;
  onDelete: (id: string) => void;
}

export function CandidatesTable({
  candidates,
  currentPage,
  itemsPerPage,
  onPageChange,
  onConfirm,
  onDelete
}: CandidatesTableProps) {
  // Add console logs to debug pagination
  console.log('Total candidates in table:', candidates.length);
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage; // Fix: Changed calculation
  const currentItems = candidates.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(candidates.length / itemsPerPage);

  console.log('Current items:', currentItems.length);
  console.log('Page range:', indexOfFirstItem, 'to', indexOfLastItem);
  console.log('Total pages:', totalPages);

  // Add useEffect to reset page if we're beyond max pages
  React.useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      onPageChange(totalPages);
    }
  }, [currentPage, totalPages, onPageChange]);

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <div className="min-w-max">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50">ID</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                
                {/* Diagnosis 1 */}
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diagnosis 1</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity 1</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Short Term 1</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Long Term 1</th>
                
                {/* Diagnosis 2 */}
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diagnosis 2</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity 2</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Short Term 2</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Long Term 2</th>
                
                {/* Personality */}
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MBTI</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DISC</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enneagram</th>
                
                {/* Work Preferences */}
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min Office</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min WFH</th>
                
                {/* Add Status column before Actions */}
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider sticky right-0 bg-gray-50">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.map((candidate) => (
                <tr key={candidate.id} className="hover:bg-gray-50">
                  {/* Basic Info */}
                  <td className="px-3 py-4 text-sm text-gray-900 sticky left-0 bg-white">#{candidate.id?.slice(-4)}</td>
                  <td className="px-3 py-4 text-sm text-gray-900">{candidate.name}</td>
                  <td className="px-3 py-4 text-sm text-gray-900">{candidate.age}</td>
                  <td className="px-3 py-4 text-sm text-gray-900">{candidate.email}</td>
                  <td className="px-3 py-4 text-sm text-gray-900">{candidate.phoneNumber || '-'}</td>
                  
                  {/* Diagnosis 1 */}
                  <td className="px-3 py-4 text-sm text-gray-900">{candidate.diagnoses[0]?.type || '-'}</td>
                  <td className="px-3 py-4 text-sm text-gray-900">{candidate.diagnoses[0]?.assessment.symptomSeverity || '-'}/5</td>
                  <td className="px-3 py-4 text-sm text-gray-900">{candidate.diagnoses[0]?.assessment.symptomFluctuationShortTerm || '-'}/5</td>
                  <td className="px-3 py-4 text-sm text-gray-900">{candidate.diagnoses[0]?.assessment.symptomFluctuationLongTerm || '-'}/5</td>
                  
                  {/* Diagnosis 2 */}
                  <td className="px-3 py-4 text-sm text-gray-900">{candidate.diagnoses[1]?.type || '-'}</td>
                  <td className="px-3 py-4 text-sm text-gray-900">{candidate.diagnoses[1]?.assessment.symptomSeverity || '-'}/5</td>
                  <td className="px-3 py-4 text-sm text-gray-900">{candidate.diagnoses[1]?.assessment.symptomFluctuationShortTerm || '-'}/5</td>
                  <td className="px-3 py-4 text-sm text-gray-900">{candidate.diagnoses[1]?.assessment.symptomFluctuationLongTerm || '-'}/5</td>
                  
                  {/* Personality */}
                  <td className="px-3 py-4 text-sm text-gray-900">{candidate.mbtiType || '-'}</td>
                  <td className="px-3 py-4 text-sm text-gray-900">{candidate.discType || '-'}</td>
                  <td className="px-3 py-4 text-sm text-gray-900">{candidate.enneagramType || '-'}</td>
                  
                  {/* Work Preferences */}
                  <td className="px-3 py-4 text-sm text-gray-900">{candidate.workPreference?.minOffice || '0'}/5</td>
                  <td className="px-3 py-4 text-sm text-gray-900">{candidate.workPreference?.minWFH || '0'}/5</td>
                  
                  {/* Status Cell */}
                  <td className="px-3 py-4 text-sm">
                    <span
                      className={cn(
                        "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                        {
                          "bg-yellow-100 text-yellow-800": !candidate.matched,
                          "bg-green-100 text-green-800": candidate.matched
                        }
                      )}
                    >
                      {candidate.matched ? "Confirmed" : "Pending"}
                    </span>
                  </td>
                  
                  {/* Actions Cell */}
                  <td className="px-3 py-4 text-right space-x-1 sticky right-0 bg-white">
                    <CandidateProfileDialog candidate={candidate} />
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "text-green-600 hover:text-green-700",
                        candidate.matched && "opacity-50 cursor-not-allowed"
                      )}
                      onClick={() => onConfirm(candidate.id!)}
                      disabled={candidate.matched}
                      title={candidate.matched ? "Already confirmed" : "Confirm candidate"}
                    >
                      <CheckCircle className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => onDelete(candidate.id!)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      {candidates.length > 0 && (
        <div className="flex items-center justify-between px-4 py-3 bg-white border-t">
          <div className="flex items-center text-sm text-gray-500">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, candidates.length)} of{' '}
            {candidates.length} results
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <span className="text-sm text-gray-600 px-2">
              Page {currentPage} of {totalPages}
            </span>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
} 