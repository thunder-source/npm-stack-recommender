"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { StackSelection } from '@/lib/packageData';

interface StackSelectorProps {
  onStackChange: (selected: StackSelection) => void;
  isLoading?: boolean;
}

const SECTIONS = [
  {
    id: 'frontend',
    label: 'Frontend',
    options: ['React', 'Next.js', 'Vue', 'Nuxt', 'Svelte', 'Remix', 'None'],
  },
  {
    id: 'backend',
    label: 'Backend',
    options: ['Node.js', 'Express', 'Fastify', 'NestJS', 'Hono', 'None'],
  },
  {
    id: 'database',
    label: 'Database / ORM',
    options: ['Prisma', 'Drizzle', 'Mongoose', 'TypeORM', 'Supabase', 'None'],
  },
  {
    id: 'auth',
    label: 'Authentication',
    options: ['NextAuth', 'Clerk', 'Better Auth', 'Lucia', 'JWT Manual', 'None'],
  },
];

export function StackSelector({ onStackChange, isLoading }: StackSelectorProps) {
  const [selection, setSelection] = React.useState<StackSelection>({
    frontend: 'Next.js',
    backend: 'Node.js',
    database: 'Prisma',
    auth: 'NextAuth',
  });

  const handleSelect = (sectionId: keyof StackSelection, option: string) => {
    const newSelection = { ...selection, [sectionId]: option };
    setSelection(newSelection);
  };

  const handleTrigger = () => {
    onStackChange(selection);
  };

  return (
    <div className="w-full max-w-4xl space-y-8 bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 backdrop-blur-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SECTIONS.map((section) => (
          <div key={section.id} className="space-y-3">
            <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">
              {section.label}
            </h3>
            <div className="flex flex-wrap gap-2">
              {section.options.map((option) => {
                const isSelected = selection[section.id as keyof StackSelection] === option;
                return (
                  <button
                    key={option}
                    onClick={() => handleSelect(section.id as keyof StackSelection, option)}
                    disabled={isLoading}
                    className={cn(
                      "px-3 py-1.5 rounded-md text-sm transition-all duration-200 border",
                      isSelected
                        ? "bg-blue-600/10 border-blue-500/50 text-blue-400"
                        : "bg-zinc-800/50 border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200"
                    )}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 flex justify-end">
        <button
          onClick={handleTrigger}
          disabled={isLoading}
          className={cn(
            "px-6 py-2.5 rounded-lg font-semibold transition-all duration-200",
            "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20",
            "disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          )}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              Analyzing Stack...
            </>
          ) : (
            "Get Recommendations"
          )}
        </button>
      </div>
    </div>
  );
}
