'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SEED_JOBS } from '@/data/jobs';
import { getScreening, getSubmission } from '@/lib/local-storage';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, AlertTriangle } from 'lucide-react';
import { AI_ANALYSIS_DELAY } from '@/lib/constants';

export default function ApplicantDetailPage({
  params,
}: {
  params: { jobId: string; applicantId: string };
}) {
  const router = useRouter();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  const job = SEED_JOBS.find(j => j.id === params.jobId);
  const screening = getScreening(params.jobId);
  const submission = getSubmission(params.applicantId);

  if (!job || !screening || !submission) {
    return <div className="p-8">Not found</div>;
  }

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, AI_ANALYSIS_DELAY));

    const mockAnalysis = {
      summary: `${submission.candidateName.split(' ')[0]} demonstrates strong technical skills in React and problem solving. She has a good approach to debugging and communicates her thought process clearly.`,
      strengths: [
        'Strong understanding of React concepts',
        'Effective problem solving approach',
        'Good communication',
      ],
      concerns: [
        'Could provide more details on testing',
        'Limited experience with performance optimization',
      ],
      recommendation: 'Advance',
      recommendationReason: 'Strong candidate. Good technical skills and problem solving abilities.',
    };

    setAnalysis(mockAnalysis);
    setIsAnalyzing(false);
  };

  return (
    <div className="p-8 w-full max-w-[1400px] mx-auto">
      {/* Top Header Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="text-sm text-gray-500 font-medium mb-3 flex items-center gap-2">
            <Link href="/jobs" className="hover:text-blue-600 transition-colors">Jobs</Link>
            <span>›</span>
            <Link href={`/jobs/${params.jobId}`} className="hover:text-blue-600 transition-colors truncate max-w-[200px]">{job.title}</Link>
            <span>›</span>
            <span className="text-gray-900">{submission.candidateName}</span>
          </div>
          <h1 className="text-2xl font-bold text-[#0A195E] mb-1">Response Review</h1>
          <p className="text-sm text-gray-500">
            Submitted on {new Date(submission.submittedAt).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })}
          </p>
        </div>
        
        <Button onClick={handleAnalyze} isLoading={isAnalyzing} variant="primary" className="bg-[#0A195E] hover:bg-[#0A195E]/90 text-white rounded-lg px-6 hidden md:flex">
          {isAnalyzing ? 'Analyzing...' : 'Analyze Response'}
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column: Questions */}
        <div className="flex-1 space-y-6">
          <h3 className="font-semibold text-gray-900">Questions</h3>
          
          <div className="space-y-4">
            {submission.answers.map((answer: any, idx: number) => {
              const question = screening.questions.find((q: any) => q.id === answer.questionId);
              return (
                <div key={answer.questionId} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center shrink-0 text-sm">
                    {idx + 1}
                  </div>
                  <div className="flex-1 bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                    <p className="font-medium text-gray-900 mb-4">{question?.text}</p>
                    <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap bg-gray-50 p-4 rounded-lg border border-gray-100">
                      {answer.value || <span className="text-gray-400 italic">No response provided</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: AI Analysis */}
        <div className="w-full lg:w-[400px] xl:w-[450px]">
          <h3 className="font-semibold text-gray-900 mb-6 flex justify-between items-center">
            AI Analysis
            {analysis && (
              <span className="text-xs font-normal text-gray-400">
                Generated on {new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })}
              </span>
            )}
          </h3>

          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm min-h-[300px]">
            {!analysis ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 py-12">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="mb-6">Analyze responses to get AI-powered insights, strengths, and recommendations.</p>
                <Button onClick={handleAnalyze} isLoading={isAnalyzing} variant="primary" className="bg-[#0A195E] hover:bg-[#0A195E]/90 text-white rounded-lg w-full md:hidden">
                  {isAnalyzing ? 'Analyzing...' : 'Analyze Response'}
                </Button>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {analysis.summary}
                </p>

                <div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-3">Strengths</h4>
                  <ul className="space-y-2">
                    {analysis.strengths.map((str: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-3">Concerns</h4>
                  <ul className="space-y-2">
                    {analysis.concerns.map((con: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <AlertTriangle className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5 mt-4">
                  <h4 className="text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">Recommendation</h4>
                  <p className="text-xl font-bold text-emerald-600 mb-2">{analysis.recommendation}</p>
                  <p className="text-sm text-emerald-700 leading-relaxed">{analysis.recommendationReason}</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
