import Link from 'next/link';
import Button from '@/components/ui/Button';
import { ArrowRight, CheckCircle, PhoneCall, Users, Shield } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 bg-gradient-to-b from-white to-indigo-50/50">
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium text-indigo-600 ring-1 ring-inset ring-indigo-600/20 bg-indigo-50/50 mb-4">
            <span className="flex h-2 w-2 rounded-full bg-indigo-600 mr-2"></span>
            Next-Gen Recruiting
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight">
            Automate Your <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              Phone Screenings
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            The intelligent platform for conducting technical phone screens. Save time, evaluate fairly, and hire the best talent faster.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/jobs">
              <Button size="lg" className="text-lg px-8 h-14 w-full sm:w-auto group">
                Go to Dashboard
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/jobs/create">
              <Button size="lg" variant="secondary" className="text-lg px-8 h-14 w-full sm:w-auto bg-white hover:bg-gray-50">
                Create a Job
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Why choose our platform?</h2>
            <p className="mt-4 text-lg text-gray-600">Everything you need to scale your hiring process.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: PhoneCall,
                title: 'Automated Interviews',
                description: 'Conduct preliminary phone screens automatically, saving hours of recruiter time.'
              },
              {
                icon: Users,
                title: 'Fair Evaluation',
                description: 'Standardized questions ensure every candidate is evaluated on the same criteria.'
              },
              {
                icon: Shield,
                title: 'Secure & Private',
                description: 'Enterprise-grade security to protect candidate data and your company IP.'
              }
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 hover:bg-indigo-50/50 transition-colors border border-gray-100">
                <div className="w-14 h-14 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
