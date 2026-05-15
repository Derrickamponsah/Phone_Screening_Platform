'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SEED_JOBS } from '@/data/jobs';
import { generateQuestionTemplates } from '@/lib/utils';
import { saveScreening } from '@/lib/local-storage';
import { generateId } from '@/lib/utils';
import Button from '@/components/ui/Button';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { Question } from '@/types';
import { QUESTION_GENERATION_DELAY } from '@/lib/constants';
import { Check, Edit2, Trash2, Sparkles, Plus, GripVertical } from 'lucide-react';

const STEPS = [
  { id: 1, label: 'Select Job' },
  { id: 2, label: 'Generate Questions' },
  { id: 3, label: 'Edit Questions' },
  { id: 4, label: 'Add Custom Question' },
  { id: 5, label: 'Save Screening' },
];

export default function CreateScreeningPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedJob, setSelectedJob] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [customQuestion, setCustomQuestion] = useState('');
  const [customResponseType, setCustomResponseType] = useState<'text' | 'audio'>('text');

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, ...updates } : q));
  };

  const handleNext = () => {
    if (step === 1 && selectedJob) {
      setStep(2);
    } else if (step === 3) {
      setStep(4);
    } else if (step === 4) {
      setStep(5);
    }
  };

  const handleGenerateQuestions = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, QUESTION_GENERATION_DELAY));
    const templates = generateQuestionTemplates[selectedJob] || [];
    setQuestions(templates.map((q) => ({
      id: generateId(),
      text: q.text,
      responseType: q.responseType,
      isCustom: false,
    })));
    setIsGenerating(false);
    setStep(3);
  };

  const handleAddQuestion = () => {
    if (!customQuestion.trim()) return;
    setQuestions([
      ...questions,
      {
        id: generateId(),
        text: customQuestion,
        responseType: customResponseType,
        isCustom: true,
      },
    ]);
    setCustomQuestion('');
  };

  const handleSaveScreening = () => {
    if (!selectedJob || questions.length === 0) return;
    saveScreening(selectedJob, {
      id: generateId(),
      jobId: selectedJob,
      questions,
      createdAt: new Date().toISOString(),
    });
    router.push(`/jobs/${selectedJob}`);
  };

  const job = SEED_JOBS.find(j => j.id === selectedJob);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 -mt-8 -mx-8">
      {/* Left Sidebar Steps */}
      <div className="w-full md:w-[320px] bg-[#0A195E] text-white p-8 shrink-0 flex flex-col">
        <h1 className="text-2xl font-bold mb-10">Create Phone Screening</h1>
        
        <div className="space-y-6 flex-1">
          {STEPS.map((s) => {
            const isActive = step === s.id;
            const isPast = step > s.id;
            return (
              <div key={s.id} className={`flex items-center gap-4 transition-opacity ${isActive || isPast ? 'opacity-100' : 'opacity-50'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-medium transition-colors ${
                  isActive ? 'bg-white text-[#0A195E]' : isPast ? 'bg-blue-600 text-white' : 'border border-white/30 text-white'
                }`}>
                  {isPast ? <Check className="w-4 h-4" /> : s.id}
                </div>
                <div className={`font-medium ${isActive ? 'text-white' : 'text-gray-300'}`}>
                  {s.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* AI Promo box */}
        <div className="mt-8 bg-blue-600/20 border border-blue-500/30 rounded-xl p-5 relative overflow-hidden">
          <Sparkles className="absolute top-4 right-4 text-blue-400 w-5 h-5 opacity-50" />
          <h3 className="font-semibold text-white mb-2 pr-6">Generate smart questions</h3>
          <p className="text-sm text-blue-200">AI-powered questions tailored to the role and requirements.</p>
        </div>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 flex flex-col bg-white p-8 md:p-12">
        <div className="max-w-3xl flex-1 flex flex-col">
          <div className="mb-8">
            <div className="text-sm text-gray-500 font-medium mb-2">Step {step} of 5</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-between">
              <span>
                {step === 1 && 'Select a job'}
                {step === 2 && 'Generating questions...'}
                {step === 3 && 'Edit your questions'}
                {step === 4 && 'Add custom questions'}
                {step === 5 && 'Review and save'}
              </span>
              {step === 3 && (
                <Button variant="secondary" size="sm" onClick={() => setStep(4)} className="text-sm font-medium h-9 text-blue-600 border-blue-200 hover:bg-blue-50">
                  <Plus className="w-4 h-4 mr-1" /> Add Custom Question
                </Button>
              )}
            </h2>
            <p className="text-gray-500 text-lg">
              {step === 1 && 'Choose a job to create a phone screening for.'}
              {step === 2 && 'Generate AI-powered questions tailored to the role.'}
              {step === 3 && 'Review, edit or remove questions. Reorder to adjust the flow.'}
            </p>
          </div>

          <div className="flex-1">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job</label>
                  <select
                    value={selectedJob}
                    onChange={(e) => setSelectedJob(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50/50 appearance-none text-gray-900"
                  >
                    <option value="">Select a job...</option>
                    {SEED_JOBS.map((j) => (
                      <option key={j.id} value={j.id}>
                        {j.title} • {j.location} • {j.employmentType}
                      </option>
                    ))}
                  </select>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center py-16 px-4">
                  <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6">
                    <Sparkles className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">Generate Phone Screening Questions</h3>
                  <p className="text-gray-500 text-center max-w-md mb-8">
                    Click the button below to produce a list of 5–8 reasonable phone-screening questions tailored for the {job?.title} role.
                  </p>
                  <Button 
                    onClick={handleGenerateQuestions} 
                    isLoading={isGenerating} 
                    variant="primary" 
                    className="bg-blue-600 hover:bg-blue-700 px-8 h-14 text-lg w-full max-w-sm"
                  >
                    {isGenerating ? 'Generating...' : 'Generate Questions'}
                  </Button>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                  <Reorder.Group axis="y" values={questions} onReorder={setQuestions} className="space-y-3 w-full">
                    {questions.map((q, idx) => (
                      <Reorder.Item key={q.id} value={q} className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl bg-white group hover:border-gray-300 transition-colors shadow-sm">
                        <div className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500 px-1">
                          <GripVertical className="w-4 h-4" />
                        </div>
                        <div className="w-4 text-gray-400 font-medium text-sm text-center">{idx + 1}</div>
                        <input 
                          className="flex-1 text-gray-900 bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-blue-500 rounded p-1 text-sm font-medium"
                          value={q.text}
                          onChange={(e) => updateQuestion(q.id, { text: e.target.value })}
                        />
                        <div className="relative">
                          <select 
                            value={q.responseType}
                            onChange={(e) => updateQuestion(q.id, { responseType: e.target.value as 'text' | 'audio' })}
                            className="pl-3 pr-8 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 appearance-none font-medium min-w-[90px] cursor-pointer hover:bg-gray-100 transition-colors"
                          >
                            <option value="text">Text</option>
                            <option value="audio">Audio</option>
                          </select>
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1.5 text-gray-400 hover:text-blue-600 rounded-md hover:bg-blue-50 transition-colors"><Edit2 className="w-4 h-4" /></button>
                          <button onClick={() => setQuestions(questions.filter(x => x.id !== q.id))} className="p-1.5 text-gray-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </Reorder.Item>
                    ))}
                  </Reorder.Group>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Question Text</label>
                    <textarea
                      value={customQuestion}
                      onChange={(e) => setCustomQuestion(e.target.value)}
                      placeholder="e.g. Can you explain your experience with..."
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px] resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Response Type</label>
                    <div className="flex gap-4">
                      {['text', 'audio'].map((type) => (
                        <button
                          key={type}
                          onClick={() => setCustomResponseType(type as any)}
                          className={`flex-1 py-3 px-4 rounded-xl border font-medium capitalize transition-all ${
                            customResponseType === type ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {type} Response
                        </button>
                      ))}
                    </div>
                  </div>
                  <Button onClick={handleAddQuestion} variant="secondary" className="w-full border-gray-200 h-12">
                    <Plus className="w-4 h-4 mr-2" /> Add Question
                  </Button>
                  
                  {questions.length > 0 && (
                    <div className="pt-6 border-t border-gray-100">
                      <h4 className="font-medium text-gray-900 mb-3">Current Questions ({questions.length})</h4>
                      <div className="space-y-2">
                        {questions.slice(-2).map((q) => (
                          <div key={q.id} className="text-sm text-gray-600 truncate bg-gray-50 p-2 rounded">
                            • {q.text}
                          </div>
                        ))}
                        {questions.length > 2 && <div className="text-sm text-gray-400 pl-2">...and {questions.length - 2} more</div>}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {step === 5 && (
                <motion.div key="step5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 text-center py-10">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Ready to save!</h3>
                  <p className="text-gray-500 max-w-sm mx-auto">
                    You have generated a screening with {questions.length} questions for {job?.title}.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Actions */}
          <div className="pt-6 border-t border-gray-100 flex justify-between mt-auto">
            {step === 1 ? (
              <Button variant="ghost" onClick={() => router.push('/jobs')} className="text-gray-500 px-6">Cancel</Button>
            ) : (
              <Button variant="ghost" onClick={() => setStep(step === 4 && questions.length === 0 ? 3 : step - 1)} className="text-gray-600 bg-gray-100 hover:bg-gray-200 px-8 h-12">Back</Button>
            )}

            {step < 5 ? (
              <Button variant="primary" onClick={handleNext} disabled={(step === 1 && !selectedJob) || step === 2} className="bg-blue-600 px-10 h-12">Next</Button>
            ) : (
              <Button variant="primary" onClick={handleSaveScreening} className="bg-blue-600 px-10 h-12">Publish Screening</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
