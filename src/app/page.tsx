"use client";

import React from 'react';
import { StackSelector } from '@/components/StackSelector';
import { ResultsPanel } from '@/components/ResultsPanel';
import { StackSelection, Package, getPackagesForStack } from '@/lib/packageData';
import { Terminal, Github } from 'lucide-react';

export default function Home() {
  const [results, setResults] = React.useState<Package[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasSearched, setHasSearched] = React.useState(false);

  const handleStackChange = (selection: StackSelection) => {
    setIsLoading(true);
    setHasSearched(true);
    
    // Simulate API delay
    setTimeout(() => {
      const stacks = Object.values(selection).filter(s => s !== 'None');
      const recommended = getPackagesForStack(stacks);
      setResults(recommended);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 selection:bg-blue-500/30">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Terminal className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">npm Stack Recommender</span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              className="text-zinc-400 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-6 pt-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Real-time npm Insights
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight max-w-3xl mx-auto leading-[1.1]">
            Build your stack with the <span className="text-blue-500">best packages</span>.
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Stop guessing. Discover the most essential, high-performance, and widely-used 
            npm packages tailored perfectly to your specific tech stack.
          </p>
        </section>

        {/* Selector Section */}
        <section className="flex justify-center">
          <StackSelector onStackChange={handleStackChange} isLoading={isLoading} />
        </section>

        {/* Results Section */}
        {hasSearched && (
          <section className="flex justify-center pt-8 border-t border-zinc-900">
            <ResultsPanel packages={results} isLoading={isLoading} />
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-12 bg-zinc-950">
        <div className="max-w-6xl mx-auto px-6 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-zinc-600 font-medium">
            <span>Built for developers</span>
            <span className="w-1 h-1 bg-zinc-800 rounded-full" />
            <span>Open Source</span>
          </div>
          <p className="text-sm text-zinc-500">
            &copy; {new Date().getFullYear()} npm Stack Recommender. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
