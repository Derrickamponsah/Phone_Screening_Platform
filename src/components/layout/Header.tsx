'use client';

import React from 'react';
import Link from 'next/link';
import { Briefcase, ChevronRight } from 'lucide-react';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showNav?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, showNav = true }) => {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Phone Screening</h1>
              <p className="text-xs text-gray-500">Recruiting Platform</p>
            </div>
          </div>

          {showNav && (
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/jobs"
                className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors"
              >
                Jobs
              </Link>
            </nav>
          )}
        </div>

        {title && (
          <div className="py-4 border-t border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
          </div>
        )}
      </div>
    </header>
  );
};

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {item.href ? (
            <Link href={item.href} className="text-blue-600 hover:text-blue-700 font-medium">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium">{item.label}</span>
          )}
          {index < items.length - 1 && <ChevronRight className="w-4 h-4" />}
        </React.Fragment>
      ))}
    </div>
  );
};
