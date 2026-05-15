'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Briefcase, 
  PlusCircle, 
  LayoutList, 
  Users, 
  Settings,
  HelpCircle,
  PhoneCall
} from 'lucide-react';

const navItems = [
  { label: 'Jobs', href: '/jobs', icon: Briefcase, matchExact: true },
  { label: 'Create Screening', href: '/jobs/create', icon: PlusCircle },
  { label: 'Applicants', href: '/applicants', icon: Users },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-[#0A195E] text-white flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 flex items-center gap-3">
        <div className="p-2 bg-white/10 rounded-lg">
          <PhoneCall className="w-6 h-6 text-white" />
        </div>
        <div className="font-bold text-lg leading-tight">
          Phone Screening<br />Platform
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 mt-6 space-y-2">
        {navItems.map((item) => {
          const isActive = item.matchExact 
            ? pathname === item.href 
            : pathname?.startsWith(item.href) && item.href !== '#';

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-600/50 text-white'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer / User Profile */}
      <div className="p-4 mt-auto">
        <div className="bg-white/5 rounded-xl p-4 mb-4 cursor-pointer hover:bg-white/10 transition">
          <div className="flex items-center gap-3 text-sm text-gray-300">
            <HelpCircle className="w-5 h-5" />
            <div>
              <div className="font-medium text-white">Need help?</div>
              <div className="text-xs text-gray-400">View documentation</div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3 px-2 py-2">
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
            alt="User avatar" 
            className="w-10 h-10 rounded-full bg-indigo-200"
          />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-white truncate">Remotown Recruiter</div>
            <div className="text-xs text-gray-400 truncate">recruiter@remotown.com</div>
          </div>
        </div>
      </div>
    </div>
  );
};
