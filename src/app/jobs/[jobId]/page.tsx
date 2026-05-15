'use client';

import { useState, useEffect } from 'react';
import { SEED_JOBS } from '@/data/jobs';
import { getScreening, getSubmissionsForJob } from '@/lib/local-storage';
import { generateScreeningLink, copyToClipboard } from '@/lib/utils';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { useToast } from '@/hooks';
import { ToastContainer } from '@/components/ui/Toast';
import { ArrowLeft, Copy, MoreHorizontal } from 'lucide-react';
import { formatDateTime } from '@/lib/utils';

export default function JobDetailPage({ params }: { params: { jobId: string } }) {
  const { toasts, addToast, removeToast } = useToast();
  const [activeTab, setActiveTab] = useState<'applicants' | 'screenings'>('applicants');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const job = SEED_JOBS.find(j => j.id === params.jobId);
  const screening = mounted ? getScreening(params.jobId) : null;
  const submissions = mounted ? getSubmissionsForJob(params.jobId) : [];

  if (!mounted) {
    return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-[#0A195E] border-t-transparent rounded-full animate-spin"></div></div>;
  }

  if (!job) return <div className="p-8">Job not found</div>;

  const handleCopyLink = async () => {
    const link = generateScreeningLink(params.jobId);
    const success = await copyToClipboard(link);
    addToast(success ? 'Screening link copied!' : 'Failed to copy link', success ? 'success' : 'error');
  };

  return (
    <div className="p-8 w-full max-w-[1400px] mx-auto">
      {/* Breadcrumb / Top Bar */}
      <div className="text-sm text-gray-500 font-medium mb-6 flex items-center gap-2">
        <Link href="/jobs" className="hover:text-blue-600 transition-colors">Jobs</Link>
        <span>›</span>
        <span className="text-gray-900">{job.title}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
        <div className="flex items-start gap-4">
          <Link href="/jobs" className="mt-1 p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-[#0A195E] mb-2">{job.title}</h1>
            <div className="flex items-center text-sm text-gray-500 mb-3">
              <span>{job.location}</span>
              <span className="mx-2">•</span>
              <span>{job.employmentType}</span>
            </div>
            <p className="text-gray-600">{job.description || 'Build modern web applications and amazing user experiences.'}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/jobs/create">
            <Button variant="primary" className="bg-[#0A195E] hover:bg-[#0A195E]/90 text-white rounded-lg font-medium px-6">
              {screening ? 'Edit Screening' : 'Create Screening'}
            </Button>
          </Link>
          <button className="p-2 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 text-gray-700">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Public Screening Link */}
      {screening && (
        <div className="mb-10 max-w-3xl">
          <h3 className="font-semibold text-gray-900 mb-2">Public Screening Link</h3>
          <p className="text-sm text-gray-500 mb-4">Share this link with candidates to invite them for phone screening.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-600 font-mono truncate">
              {generateScreeningLink(params.jobId)}
            </div>
            <Button onClick={handleCopyLink} variant="primary" className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap rounded-lg">
              <Copy className="w-4 h-4 mr-2" /> Copy Link
            </Button>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex gap-8">
          <button 
            onClick={() => setActiveTab('applicants')}
            className={`pb-4 text-sm font-semibold border-b-2 transition-colors ${
              activeTab === 'applicants' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Applicants ({submissions.length})
          </button>
          <button 
            onClick={() => setActiveTab('screenings')}
            className={`pb-4 text-sm font-semibold border-b-2 transition-colors ${
              activeTab === 'screenings' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Screenings ({screening ? 1 : 0})
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'applicants' && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="px-6 py-4 text-sm font-semibold text-gray-900 w-1/4">Name</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-900 w-1/4">Email</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-900 w-1/4">Submitted On</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-900 w-1/4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500 text-sm">
                    No applicants yet
                  </td>
                </tr>
              ) : (
                submissions.map((sub: any) => (
                  <tr key={sub.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">
                          {sub.candidateName.split(' ').map((n: string) => n[0]).join('').toUpperCase().substring(0,2)}
                        </div>
                        <span className="text-sm font-medium text-gray-900">{sub.candidateName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{sub.candidateEmail}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{formatDateTime(sub.submittedAt)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link href={`/jobs/${params.jobId}/applicants/${sub.id}`}>
                          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                            View Responses
                          </button>
                        </Link>
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'screenings' && (
        <div className="text-center py-12 text-gray-500 text-sm bg-white rounded-xl border border-gray-100 shadow-sm">
          {screening ? 'Screening is active.' : 'No active screening. Create one!'}
        </div>
      )}

      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    </div>
  );
}
