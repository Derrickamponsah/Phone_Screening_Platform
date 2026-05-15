'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SEED_JOBS } from '@/data/jobs';
import { getScreening, saveSubmission } from '@/lib/local-storage';
import { generateId } from '@/lib/utils';
import Button from '@/components/ui/Button';
import { Input, TextArea } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { Answer, ScreeningState } from '@/types';

export default function ScreeningPage({ params }: { params: { jobId: string } }) {
  const router = useRouter();
  const [state, setState] = useState<ScreeningState>({
    jobId: params.jobId,
    candidateName: '',
    candidateEmail: '',
    currentQuestionIndex: 0,
    answers: [],
    isComplete: false,
  });

  const [step, setStep] = useState<'intro' | 'questions' | 'complete'>('intro');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [responseMode, setResponseMode] = useState<'text' | 'audio'>('text');
  const [mounted, setMounted] = useState(false);

  const job = SEED_JOBS.find(j => j.id === params.jobId);
  const screening = getScreening(params.jobId);
  const currentQuestion = screening?.questions[state.currentQuestionIndex];

  // Sync mode with question preference when changing questions
  useEffect(() => {
    setMounted(true);
    if (currentQuestion) {
      setResponseMode(currentQuestion.responseType);
    }
  }, [state.currentQuestionIndex, currentQuestion]);

  if (!mounted) {
    return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>;
  }

  if (!job || !screening) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900">Screening Not Found</h1>
        <Button onClick={() => router.push('/jobs')} variant="primary" className="mt-4">
          Back to Jobs
        </Button>
      </div>
    );
  }

  const handleIntroSubmit = () => {
    let valid = true;

    if (!state.candidateName.trim()) {
      setNameError('Name is required');
      valid = false;
    }

    if (!state.candidateEmail.trim()) {
      setEmailError('Email is required');
      valid = false;
    }

    if (valid) {
      setStep('questions');
    }
  };

  const handleAnswerChange = (value: string) => {
    const newAnswers = [...state.answers];
    newAnswers[state.currentQuestionIndex] = {
      questionId: currentQuestion.id,
      responseType: responseMode,
      value,
    };
    setState({ ...state, answers: newAnswers });
  };

  const handleNext = () => {
    if (state.currentQuestionIndex < screening.questions.length - 1) {
      setState({ ...state, currentQuestionIndex: state.currentQuestionIndex + 1 });
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const submission = {
      id: generateId(),
      jobId: params.jobId,
      candidateName: state.candidateName,
      candidateEmail: state.candidateEmail,
      answers: state.answers,
      submittedAt: new Date().toISOString(),
    };

    saveSubmission(submission);
    setStep('complete');
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Intro Step */}
      {step === 'intro' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <Card>
            <CardContent className="pt-8 space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
                <p className="text-gray-600 mt-2">Phone Screening</p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  Thank you for your interest in this position. We'll be asking you{' '}
                  {screening.questions.length} questions to get to know you better.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <Input
                    placeholder="John Doe"
                    value={state.candidateName}
                    onChange={(e) => setState({ ...state, candidateName: e.target.value })}
                    error={nameError}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={state.candidateEmail}
                    onChange={(e) => setState({ ...state, candidateEmail: e.target.value })}
                    error={emailError}
                  />
                </div>
              </div>

              <Button onClick={handleIntroSubmit} variant="primary" className="w-full bg-blue-600 hover:bg-blue-700 h-12">
                Start Screening
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {step === 'questions' && currentQuestion && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <button className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4 mr-1" /> {job.title}
          </button>
          <div className="flex flex-col items-center mb-10">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Question {state.currentQuestionIndex + 1} of {screening.questions.length}
            </h2>
            <h3 className="text-2xl font-bold text-gray-900 text-center max-w-xl">
              {currentQuestion.text}
            </h3>
            <p className="text-gray-500 mt-2">Please provide as much detail as possible.</p>
          </div>

          <Card className="border-gray-200 shadow-sm overflow-hidden">
            <div className="flex border-b border-gray-100">
              <button 
                onClick={() => setResponseMode('text')}
                className={`flex-1 py-4 text-sm font-semibold transition-colors border-b-2 ${
                  responseMode === 'text' ? 'text-blue-600 border-blue-600 bg-white' : 'text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-50 bg-gray-50/50'
                }`}
              >
                Text Response
              </button>
              <button 
                onClick={() => setResponseMode('audio')}
                className={`flex-1 py-4 text-sm font-semibold transition-colors border-b-2 ${
                  responseMode === 'audio' ? 'text-blue-600 border-blue-600 bg-white' : 'text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-50 bg-gray-50/50'
                }`}
              >
                Audio Response
              </button>
            </div>
            <CardContent className="p-0">
              {responseMode === 'text' ? (
                <div>
                  <textarea
                    value={state.answers[state.currentQuestionIndex]?.value || ''}
                    onChange={(e) => handleAnswerChange(e.target.value)}
                    placeholder="Type your answer here..."
                    rows={10}
                    className="w-full p-6 border-none focus:ring-0 resize-none text-gray-700 bg-transparent"
                  />
                  <div className="px-6 pb-4 flex items-center justify-between border-t border-gray-100 pt-4 bg-gray-50/30">
                    <span className="text-xs font-medium text-gray-400">
                      {(state.answers[state.currentQuestionIndex]?.value || '').length} / 1500 characters
                    </span>
                  </div>
                </div>
              ) : (
                <AudioRecorder 
                  value={state.answers[state.currentQuestionIndex]?.value || ''} 
                  onChange={handleAnswerChange} 
                />
              )}
            </CardContent>
          </Card>
          
          <div className="flex justify-between items-center mt-8">
            <Button
              onClick={() => setState({ ...state, currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1) })}
              variant="ghost"
              disabled={state.currentQuestionIndex === 0}
              className="text-gray-600 px-8"
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              variant="primary"
              className="bg-blue-600 hover:bg-blue-700 px-10 h-12"
            >
              {state.currentQuestionIndex === screening.questions.length - 1 ? 'Submit' : 'Next'}
            </Button>
          </div>
        </motion.div>
      )}

      {/* Complete Step */}
      {step === 'complete' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <Card>
            <CardContent className="pt-8 space-y-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900">Thank You!</h2>
                <p className="text-gray-600 mt-2">Your screening has been submitted successfully.</p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                  We appreciate your time. The hiring team will review your responses and be in touch soon.
                </p>
              </div>

              <Button
                onClick={() => router.push('/jobs')}
                variant="secondary"
                className="w-full"
              >
                Back to Jobs
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}

const AudioRecorder = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          onChange(reader.result as string);
        };
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setRecorder(mediaRecorder);
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("Could not access microphone. Please ensure you have granted permission.");
    }
  };

  const stopRecording = () => {
    if (recorder) {
      recorder.stop();
      setIsRecording(false);
    }
  };

  // Check if the value is actually a data URL (audio recording) rather than text typed in previously
  const isAudioValue = value && value.startsWith('data:audio');

  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-[250px] space-y-6 bg-gray-50/30">
      {isAudioValue ? (
        <div className="w-full max-w-md space-y-4 flex flex-col items-center">
          <audio src={value} controls className="w-full" />
          <Button onClick={() => onChange('')} variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50 px-6">
            Delete & Re-record
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <button 
            onClick={isRecording ? stopRecording : startRecording}
            className={`w-24 h-24 rounded-full flex items-center justify-center text-white transition-all shadow-md hover:shadow-lg ${
              isRecording ? 'bg-red-500 animate-pulse ring-4 ring-red-200' : 'bg-blue-600 hover:bg-blue-700 hover:scale-105'
            }`}
          >
            {isRecording ? <div className="w-8 h-8 bg-white rounded-sm" /> : <div className="w-8 h-8 bg-white rounded-full" />}
          </button>
          <div className="text-sm font-medium text-gray-500">
            {isRecording ? 'Recording... Click square to stop' : 'Click circle to start recording'}
          </div>
          {value && !isAudioValue && (
            <div className="text-xs text-orange-500 bg-orange-50 px-3 py-1.5 rounded-full mt-2">
              Note: You currently have a text response saved. Recording audio will overwrite it.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
