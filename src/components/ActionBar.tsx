"use client";

import React from 'react';
import { Package } from '@/lib/packageData';
import { Download, Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

interface ActionBarProps {
  packages: Package[];
}

export function ActionBar({ packages }: ActionBarProps) {
  const [hasCopied, setHasCopied] = React.useState(false);

  const mustHavePackages = packages.filter(p => p.tier === 'must');
  
  const handleDownload = () => {
    if (mustHavePackages.length === 0) {
      toast.error('No must-have packages selected');
      return;
    }

    const packageJson = {
      name: "my-stack-project",
      version: "1.0.0",
      dependencies: mustHavePackages.reduce((acc, pkg) => {
        acc[pkg.name] = "latest";
        return acc;
      }, {} as Record<string, string>),
      devDependencies: {
        "typescript": "latest",
        "eslint": "latest"
      }
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(packageJson, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "package.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    
    toast.success('package.json downloaded!');
  };

  const handleCopy = () => {
    if (mustHavePackages.length === 0) {
      toast.error('No must-have packages to install');
      return;
    }

    const names = mustHavePackages.map(p => p.name).join(' ');
    const command = `npm install ${names}`;
    
    navigator.clipboard.writeText(command);
    setHasCopied(true);
    toast.success('Install command copied!');
    
    setTimeout(() => setHasCopied(false), 2000);
  };

  if (packages.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-4 animate-in fade-in slide-in-from-top-2 duration-500">
      <button
        onClick={handleDownload}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all",
          "bg-zinc-100 text-zinc-900 hover:bg-white shadow-lg shadow-white/5"
        )}
      >
        <Download className="w-4 h-4" />
        Download package.json
      </button>

      <button
        onClick={handleCopy}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all border",
          "bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white"
        )}
      >
        {hasCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
        {hasCopied ? 'Copied!' : 'Copy install command'}
      </button>
    </div>
  );
}
