'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getDashboardStats, getAllCandidates, confirmCandidate } from '@/lib/firebase/admin-service';
import type { Candidate } from '@/types/candidate';
import { 
  CheckCircle, 
  Trash2
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
          <div className="p-6 bg-white border-b">
            <h2 className="text-xl font-semibold text-gray-900">Recent Applications</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Age
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Diagnosis
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                      Loading candidates...
                    </td>
                  </tr>
                ) : candidates.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                      No candidates found
                    </td>
                  </tr>
                ) : (
                  candidates.map((candidate) => (
                    <tr key={candidate.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {candidate.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {candidate.age}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{candidate.email}</div>
                        {candidate.phoneNumber && (
                          <div className="text-sm text-gray-500">{candidate.phoneNumber}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{candidate.diagnosis1}</div>
                        {candidate.diagnosis2 && (
                          <div className="text-sm text-gray-500">{candidate.diagnosis2}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          candidate.reviewed
                            ? candidate.matched
                              ? 'bg-green-100 text-green-800'
                              : 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {candidate.reviewed
                            ? candidate.matched
                              ? 'Matched'
                              : 'Reviewed'
                            : 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          {/* View Button */}
                          <CandidateProfileDialog candidate={candidate} />

                          {/* Confirm Button */}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-green-600 hover:text-green-700"
                            onClick={() => handleConfirmCandidate(candidate.id!)}
                            disabled={candidate.reviewed}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>

                          {/* Delete Button */}
                          <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-white [&>button]:hidden">
                              <DialogHeader>
                                <DialogTitle>Confirm Deletion</DialogTitle>
                                <DialogDescription>
                                  Are you sure you want to delete this candidate? This action cannot be undone.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="mt-4 flex justify-end gap-3">
                                <Button
                                  variant="outline"
                                  onClick={() => setShowDeleteDialog(false)}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  variant="destructive"
                                  onClick={() => handleDeleteCandidate(candidate.id!)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Delete
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  );
} 