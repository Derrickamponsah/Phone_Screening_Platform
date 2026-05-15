'use client';

import { SEED_JOBS } from '@/data/jobs';
import { JobsGrid } from '@/components/jobs/JobsGrid';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { Search, Briefcase, LayoutList, Users, CheckSquare } from 'lucide-react';

const StatCard = ({ icon: Icon, value, label, iconBg, iconColor }: any) => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
    <div className={`p-4 rounded-xl ${iconBg}`}>
      <Icon className={`w-6 h-6 ${iconColor}`} />
    </div>
    <div>
      <div className="text-2xl font-bold text-[#0A195E]">{value}</div>
      <div className="text-sm font-medium text-gray-500">{label}</div>
    </div>
  </div>
);

export default function JobsPage() {
  return (
    <div className="p-8 w-full max-w-[1400px] mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#0A195E]">Jobs</h1>
          <p className="text-gray-500 mt-1">Manage your open roles and phone screenings</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search jobs..." 
              className="pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-50/50 w-64 text-sm" 
            />
          </div>
          <Link href="/jobs/create">
            <Button variant="primary" className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-2.5 whitespace-nowrap h-auto font-medium">
              + Create Phone Screening
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Briefcase} value="3" label="Open Jobs" iconBg="bg-blue-50" iconColor="text-blue-600" />
        <StatCard icon={LayoutList} value="5" label="Screenings Created" iconBg="bg-indigo-50" iconColor="text-indigo-600" />
        <StatCard icon={Users} value="12" label="Applicants Screened" iconBg="bg-blue-50" iconColor="text-blue-600" />
        <StatCard icon={CheckSquare} value="8" label="Completed Screenings" iconBg="bg-emerald-50" iconColor="text-emerald-500" />
      </div>

      {/* Main List */}
      <JobsGrid jobs={SEED_JOBS} />
    </div>
  );
}
