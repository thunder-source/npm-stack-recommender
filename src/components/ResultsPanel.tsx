"use client";

import React from "react";
import { Package, Tier } from "@/lib/packageData";
import { PackageCard } from "./PackageCard";
import { LayoutGrid, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { ActionBar } from "./ActionBar";

interface ResultsPanelProps {
  packages: Package[];
  isLoading?: boolean;
}

export function ResultsPanel({ packages, isLoading }: ResultsPanelProps) {
  const [activeFilter, setActiveFilter] = React.useState<"all" | Tier>("all");

  const filteredPackages =
    activeFilter === "all"
      ? packages
      : packages.filter((p) => p.tier === activeFilter);

  // Group by category
  const categories = Array.from(
    new Set(filteredPackages.map((p) => p.category)),
  );

  const stats = {
    total: packages.length,
    must: packages.filter((p) => p.tier === "must").length,
    rec: packages.filter((p) => p.tier === "rec").length,
  };

  const timestamp = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  if (!isLoading && packages.length === 0) {
    return (
      <div className="w-full max-w-4xl py-20 text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 mb-2">
          <LayoutGrid className="w-8 h-8 text-zinc-700" />
        </div>
        <h3 className="text-xl font-semibold text-zinc-300">
          No packages found
        </h3>
        <p className="text-zinc-500 max-w-md mx-auto">
          Try selecting a different combination of technologies in your stack.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header with Stats & Actions */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-white">Recommended Stack</h2>
            <p className="text-zinc-500 text-sm">
              Curated selection based on your specific requirements.
            </p>
          </div>
          <ActionBar packages={packages} />
        </div>

        {/* Stats Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 bg-zinc-900/30 border border-zinc-800 rounded-2xl">
          <div className="flex items-center gap-8">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">
                Total Packages
              </span>
              <div className="text-2xl font-bold text-zinc-100">
                {stats.total}
              </div>
            </div>
            <div className="w-px h-10 bg-zinc-800 hidden md:block" />
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">
                Must-have
              </span>
              <div className="text-2xl font-bold text-blue-400">
                {stats.must}
              </div>
            </div>
            <div className="w-px h-10 bg-zinc-800 hidden md:block" />
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">
                Recommended
              </span>
              <div className="text-2xl font-bold text-emerald-400">
                {stats.rec}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-zinc-500 text-xs bg-zinc-900/50 px-3 py-1.5 rounded-full border border-zinc-800">
            <Clock className="w-3.5 h-3.5" />
            <span>Last synced: {timestamp}</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          {(["all", "must", "rec", "opt"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-200",
                activeFilter === filter
                  ? "bg-zinc-100 border-zinc-100 text-zinc-900 shadow-lg shadow-white/5"
                  : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300",
              )}
            >
              {filter === "all"
                ? "All Packages"
                : filter === "must"
                  ? "Must-have"
                  : filter === "rec"
                    ? "Recommended"
                    : "Optional"}
            </button>
          ))}
        </div>

        {/* Results Groups */}
        <div className="space-y-12 pt-4">
          {categories.map((category) => (
            <section key={category} className="space-y-6">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-bold text-zinc-100">{category}</h2>
                <div className="h-px flex-1 bg-zinc-800" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredPackages
                  .filter((p) => p.category === category)
                  .map((pkg) => (
                    <PackageCard
                      key={pkg.name}
                      {...pkg}
                      isLoading={isLoading}
                      weeklyDownloads={pkg.weeklyDownloads || 0}
                    />
                  ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
