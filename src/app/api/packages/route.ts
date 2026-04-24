import { NextRequest, NextResponse } from 'next/server';
import { getPackagesForStack } from '@/lib/packageData';
import { getBulkDownloads } from '@/lib/npmApi';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const stacksParam = searchParams.get('stacks');

  if (!stacksParam) {
    return NextResponse.json({ error: 'Missing stacks parameter' }, { status: 400 });
  }

  const stacks = stacksParam.split(',').filter(Boolean);
  
  let enrichedPackages: any[] = [];
  
  // Try to get from Supabase first
  const { supabase } = await import('@/lib/supabase');
  if (supabase) {
    const { getPackagesByStacks } = await import('@/lib/db');
    enrichedPackages = await getPackagesByStacks(stacks);
  }

  // Fallback if Supabase is not configured or returns empty
  if (enrichedPackages.length === 0) {
    const curatedPackages = getPackagesForStack(stacks);
    const packageNames = curatedPackages.map(pkg => pkg.name);
    const downloadCounts = await getBulkDownloads(packageNames);
    
    enrichedPackages = curatedPackages.map(pkg => ({
      ...pkg,
      weeklyDownloads: downloadCounts[pkg.name] || 0
    }));
  }

  // 5. Calculate meta stats
  const meta = {
    totalCount: enrichedPackages.length,
    mustHaveCount: enrichedPackages.filter(p => p.tier === 'must').length,
    lastFetched: new Date().toISOString()
  };

  return NextResponse.json(
    { packages: enrichedPackages, meta },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=59'
      }
    }
  );
}
