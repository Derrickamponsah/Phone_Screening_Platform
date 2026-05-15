'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllSubmissions } from '@/lib/local-storage';
import { SEED_JOBS } from '@/data/jobs';
import { formatDateTime } from '@/lib/utils';
import { MoreHorizontal } from 'lucide-react';
import { Submission } from '@/types';

export default function ApplicantsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  useEffect(() => {
    const allSubs = getAllSubmissions();
    const sortedSubs = Object.values(allSubs).sort(
      (a: any, b: any) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    );
    setSubmissions(sortedSubs);
  }, []);

  const getJobTitle = (jobId: string) => {
    return SEED_JOBS.find((j) => j.id === jobId)?.title || 'Unknown Role';
  };

  return (
    <div className="p-8 w-full max-w-[1400px] mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#0A195E]">Applicants</h1>
        <p className="text-gray-500 mt-1">Manage candidates across all open roles.</p>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="px-6 py-4 text-sm font-semibold text-gray-900 w-1/4">Name</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-900 w-1/4">Role</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-900 w-1/4">Submitted On</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-900 w-1/4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissions.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-500 text-sm">
                  No applicants yet
                </td>
              </tr>
            ) : (
              submissions.map((sub: Submission) => (
                <tr key={sub.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">
                        {sub.candidateName.split(' ').map((n: string) => n[0]).join('').toUpperCase().substring(0,2)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{sub.candidateName}</div>
                        <div className="text-xs text-gray-500">{sub.candidateEmail}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{getJobTitle(sub.jobId)}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{formatDateTime(sub.submittedAt)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/jobs/${sub.jobId}/applicants/${sub.id}`}>
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
    </div>
  );
}
