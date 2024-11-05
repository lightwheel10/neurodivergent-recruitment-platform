'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getDashboardStats, getAllCandidates, confirmCandidate } from '@/lib/firebase/admin-service';
import type { Candidate } from '@/types/candidate';
import { 
  CheckCircle, 
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight 
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CandidateProfileDialog } from "@/components/admin/CandidateProfileDialog";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { CandidatesTable } from "@/components/admin/CandidatesTable";
import { FilterPanel, FilterOptions, defaultFilters } from '@/components/admin/FilterPanel';

export default function AdminDashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCandidates: 0,
    pendingReview: 0,
    successfulMatches: 0,
  });
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filters, setFilters] = useState<FilterOptions>(defaultFilters);

  useEffect(() => {
    // Check if admin is authenticated
    const isAuthenticated = sessionStorage.getItem('isAdminAuthenticated');
    if (!isAuthenticated) {
      router.push('/admin');
      return;
    }

    async function loadDashboardData() {
      try {
        const [dashboardStats, candidatesData] = await Promise.all([
          getDashboardStats(),
          getAllCandidates()
        ]);
        
        setStats(dashboardStats);
        setCandidates(candidatesData);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadDashboardData();
  }, [router]);

  useEffect(() => {
    if (candidates.length === 0) return;

    const filtered = candidates.filter(candidate => {
      const filterConditions = [];

      // Combined Diagnosis Filtering with Position Check
      const hasPrimaryMatch = candidate.diagnoses[0]?.type === filters.diagnosis;
      const hasSecondaryMatch = candidate.diagnoses[1]?.type === filters.diagnosis2;
      
      // Primary Diagnosis Filter
      if (filters.diagnosis !== 'all') {
        filterConditions.push(hasPrimaryMatch);
      }

      // Secondary Diagnosis Filter (independent of primary)
      if (filters.diagnosis2 !== 'all') {
        filterConditions.push(hasSecondaryMatch);
      }

      // Assessment Score Filtering - Optimized
      const isAssessmentFiltered = 
        filters.shortTermRange[0] !== 0 || 
        filters.shortTermRange[1] !== 5 ||
        filters.longTermRange[0] !== 0 || 
        filters.longTermRange[1] !== 5 ||
        filters.severityRange[0] !== 0 || 
        filters.severityRange[1] !== 5;

      if (isAssessmentFiltered) {
        // Optimize by checking each diagnosis only once
        const assessmentMatches = candidate.diagnoses.some(diagnosis => {
          if (!diagnosis?.assessment) return false;

          // Destructure for cleaner code and better performance
          const {
            symptomFluctuationShortTerm: shortTerm = 0,
            symptomFluctuationLongTerm: longTerm = 0,
            symptomSeverity: severity = 0
          } = diagnosis.assessment;

          // Check all ranges at once
          return (
            shortTerm >= filters.shortTermRange[0] &&
            shortTerm <= filters.shortTermRange[1] &&
            longTerm >= filters.longTermRange[0] &&
            longTerm <= filters.longTermRange[1] &&
            severity >= filters.severityRange[0] &&
            severity <= filters.severityRange[1]
          );
        });

        filterConditions.push(assessmentMatches);
      }

      // Personality Type Filters - Combined check
      const personalityFilters = [];
      if (filters.mbtiType !== 'all') {
        personalityFilters.push(candidate.mbtiType === filters.mbtiType);
      }
      if (filters.discType !== 'all') {
        personalityFilters.push(candidate.discType === filters.discType);
      }
      
      if (personalityFilters.length > 0) {
        filterConditions.push(personalityFilters.every(condition => condition));
      }

      // Work Preference Filtering - Optimized
      const isWorkPreferenceFiltered = 
        filters.minOffice[0] !== 0 || 
        filters.minOffice[1] !== 5 ||
        filters.minWFH[0] !== 0 || 
        filters.minWFH[1] !== 5;

      if (isWorkPreferenceFiltered) {
        const { minOffice = 0, minWFH = 0 } = candidate.workPreference ?? {};

        const workPreferenceMatches = 
          minOffice >= filters.minOffice[0] &&
          minOffice <= filters.minOffice[1] &&
          minWFH >= filters.minWFH[0] &&
          minWFH <= filters.minWFH[1];

        filterConditions.push(workPreferenceMatches);
      }

      // Performance optimization: early return if no filters
      if (filterConditions.length === 0) return true;

      // All active filters must pass
      return filterConditions.every(condition => condition);
    });

    setFilteredCandidates(filtered);
    setCurrentPage(1);
  }, [candidates, filters]);

  // Update sign out button handler
  const handleSignOut = () => {
    sessionStorage.removeItem('isAdminAuthenticated');
    router.push('/');
  };

  const handleConfirmCandidate = async (candidateId: string) => {
    try {
      await confirmCandidate(candidateId);
      
      // Refresh the data
      const [dashboardStats, candidatesData] = await Promise.all([
        getDashboardStats(),
        getAllCandidates()
      ]);
      
      setStats(dashboardStats);
      setCandidates(candidatesData);
      
      // Show success message (optional)
      alert('Candidate confirmed successfully!');
    } catch (error) {
      console.error('Error confirming candidate:', error);
      alert('Error confirming candidate. Please try again.');
    }
  };

  const handleDeleteCandidate = async (candidateId: string) => {
    // TODO: Implement delete logic
    console.log('Deleting candidate:', candidateId);
    setShowDeleteDialog(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500" />
            <span className="font-semibold text-gray-900">NeuroDev Admin</span>
          </Link>
          <Button
            variant="ghost"
            onClick={handleSignOut}
            className="text-gray-600"
          >
            Sign Out
          </Button>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage candidates and view analytics</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { 
              title: 'Total Candidates',
              value: stats.totalCandidates,
              change: 'Total applications'
            },
            { 
              title: 'Pending Review',
              value: stats.pendingReview,
              change: 'Needs attention'
            },
            { 
              title: 'Successful Matches',
              value: stats.successfulMatches,
              change: 'Placed candidates'
            },
          ].map((stat) => (
            <Card key={stat.title} className="p-6">
              <h3 className="text-gray-600 font-medium">{stat.title}</h3>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">
                  {isLoading ? '-' : stat.value}
                </span>
                <span className="text-sm text-gray-500">{stat.change}</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Candidates Table */}
        <Card className="overflow-hidden">
          <div className="p-6 bg-white border-b space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Recent Applications</h2>
              <div className="text-sm text-gray-500">
                Total: {candidates.length} | Filtered: {filteredCandidates.length}
              </div>
            </div>

            <FilterPanel
              filters={filters}
              onFilterChange={setFilters}
              onReset={() => setFilters(defaultFilters)}
            />
          </div>

          <CandidatesTable
            candidates={filteredCandidates}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onConfirm={handleConfirmCandidate}
            onDelete={(id) => setShowDeleteDialog(true)}
          />
        </Card>
      </main>
    </div>
  );
} 