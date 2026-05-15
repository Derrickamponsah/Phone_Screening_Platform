'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Code, PenTool, Database, ChevronRight, Search } from 'lucide-react';
import { Job } from '@/types';
import { getSubmissionsForJob, getScreening } from '@/lib/local-storage';

interface JobsGridProps {
  jobs: Job[];
}

export const JobsGrid: React.FC<JobsGridProps> = ({ jobs }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

  return (
    <div className="space-y-6">
      {/* Filters Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-3 border-b border-gray-200">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by job title..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border-none bg-transparent focus:outline-none focus:ring-0 text-gray-900 placeholder-gray-400"
          />
        </div>
        <div className="flex items-center gap-6">
          <select className="text-sm border-none bg-transparent text-gray-700 font-medium cursor-pointer focus:outline-none focus:ring-0 appearance-none pr-4">
            <option>All Employment Types</option>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
          </select>
          <select className="text-sm border-none bg-transparent text-gray-700 font-medium cursor-pointer focus:outline-none focus:ring-0 appearance-none pr-4">
            <option>Most Recent</option>
            <option>Oldest</option>
          </select>
        </div>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
        {jobs.filter(j => j.title.toLowerCase().includes(searchTerm.toLowerCase())).map((job, idx) => (
          <JobCard key={job.id} job={job} variants={item} />
        ))}
      </motion.div>
    </div>
  );
};

const JobCard = ({ job, variants }: { job: Job, variants: any }) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const screening = mounted ? getScreening(job.id) : null;
  const submissions = mounted ? getSubmissionsForJob(job.id) : [];
  
  // Decide icon based on title
  let Icon = Code;
  if (job.title.includes('Designer')) Icon = PenTool;
  if (job.title.includes('Backend')) Icon = Database;

  return (
    <motion.div variants={variants}>
      <Link href={`/jobs/${job.id}`}>
        <div className="flex flex-col sm:flex-row sm:items-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all cursor-pointer group gap-6">
          {/* Icon */}
          <div className="p-4 bg-[#0A195E] rounded-xl text-white shrink-0">
            <Icon className="w-6 h-6" />
          </div>
          
          {/* Main Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-[#0A195E] group-hover:text-blue-600 transition-colors mb-1 truncate">
              {job.title}
            </h3>
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <span>{job.location}</span>
              <span className="mx-2">•</span>
              <span>{job.employmentType}</span>
            </div>
            <p className="text-sm text-gray-600 line-clamp-1">
              Build modern web applications and amazing user experiences.
            </p>
          </div>
          
          {/* Stats */}
          <div className="flex items-center gap-10 sm:px-8">
            <div className="text-center">
              <div className="text-xl font-bold text-[#0A195E]">{screening ? 2 : 0}</div>
              <div className="text-xs font-medium text-gray-500 mt-1">Screenings</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-[#0A195E]">{submissions.length || 6}</div>
              <div className="text-xs font-medium text-gray-500 mt-1">Applicants</div>
            </div>
          </div>
          
          <div className="text-gray-300 group-hover:text-blue-600 transition-colors hidden sm:block">
            <ChevronRight className="w-6 h-6" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
