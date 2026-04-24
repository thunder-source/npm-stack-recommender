import React from 'react';
import { cn } from '@/lib/utils';
import { ExternalLink, TrendingUp } from 'lucide-react';
import { Tier } from '@/lib/packageData';

interface PackageCardProps {
  name: string;
  description: string;
  tier: Tier;
  weeklyDownloads: number | null;
  npmUrl: string;
  isLoading?: boolean;
}

export function PackageCard({
  name,
  description,
  tier,
  weeklyDownloads,
  npmUrl,
  isLoading = false,
}: PackageCardProps) {
  const formatDownloads = (num: number | null) => {
    if (num === null) return 'N/A';
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M/wk`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K/wk`;
    return `${num}/wk`;
  };

  const tierConfig = {
    must: { label: 'must-have', color: 'text-blue-400 bg-blue-400/10 border-blue-400/20' },
    rec: { label: 'recommended', color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' },
    opt: { label: 'optional', color: 'text-zinc-400 bg-zinc-400/10 border-zinc-400/20' },
  };

  if (isLoading) {
    return (
      <div className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-xl animate-pulse space-y-4">
        <div className="flex justify-between items-start">
          <div className="h-6 w-32 bg-zinc-800 rounded" />
          <div className="h-5 w-20 bg-zinc-800 rounded-full" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-full bg-zinc-800 rounded" />
          <div className="h-4 w-3/4 bg-zinc-800 rounded" />
        </div>
        <div className="flex justify-between pt-2">
          <div className="h-4 w-24 bg-zinc-800 rounded" />
          <div className="h-4 w-16 bg-zinc-800 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "group bg-zinc-900/30 border border-zinc-800 p-5 rounded-xl transition-all duration-300",
      "hover:border-zinc-700 hover:bg-zinc-900/50 hover:shadow-xl hover:shadow-black/20"
    )}>
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-mono text-lg font-bold text-zinc-100 group-hover:text-blue-400 transition-colors">
          {name}
        </h3>
        <span className={cn(
          "text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full border",
          tierConfig[tier].color
        )}>
          {tierConfig[tier].label}
        </span>
      </div>
      
      <p className="text-sm text-zinc-400 line-clamp-2 min-h-[2.5rem] mb-4 group-hover:text-zinc-300 transition-colors">
        {description}
      </p>

      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>{formatDownloads(weeklyDownloads)}</span>
        </div>
        
        <a 
          href={npmUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-zinc-500 hover:text-white transition-colors"
        >
          <span>View on npm</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
