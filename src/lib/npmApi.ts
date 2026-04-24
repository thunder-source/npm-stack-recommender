export interface PackageInfo {
  version: string;
  description: string;
  weeklyDownloads: number | null;
  npmUrl: string;
}

const CACHE_TTL = 1000 * 60 * 60; // 1 hour
const cache = new Map<string, { data: any; timestamp: number }>();

function getFromCache<T>(key: string): T | null {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data as T;
  }
  return null;
}

function setInCache(key: string, data: any) {
  cache.set(key, { data, timestamp: Date.now() });
}

export async function getWeeklyDownloads(packageName: string): Promise<number | null> {
  const cacheKey = `downloads:${packageName}`;
  const cached = getFromCache<number>(cacheKey);
  if (cached !== null) return cached;

  try {
    // Handle scoped packages (e.g. @tanstack/react-query -> @tanstack%2freact-query)
    const encodedName = packageName.startsWith('@') 
      ? `@${encodeURIComponent(packageName.slice(1))}` 
      : encodeURIComponent(packageName);

    const res = await fetch(`https://api.npmjs.org/downloads/point/last-week/${packageName}`, {
      next: { revalidate: 3600 } // Next.js level caching
    });

    if (!res.ok) return null;

    const data = await res.json();
    const downloads = data.downloads || 0;
    
    setInCache(cacheKey, downloads);
    return downloads;
  } catch (error) {
    console.error(`Error fetching downloads for ${packageName}:`, error);
    return null;
  }
}

export async function getBulkDownloads(packageNames: string[]): Promise<Record<string, number | null>> {
  const results: Record<string, number | null> = {};
  
  await Promise.allSettled(
    packageNames.map(async (name) => {
      const downloads = await getWeeklyDownloads(name);
      results[name] = downloads;
    })
  );

  return results;
}

export async function getPackageMetadata(packageName: string): Promise<Partial<PackageInfo> | null> {
  const cacheKey = `metadata:${packageName}`;
  const cached = getFromCache<Partial<PackageInfo>>(cacheKey);
  if (cached) return cached;

  try {
    const res = await fetch(`https://registry.npmjs.org/${packageName}`, {
      next: { revalidate: 3600 }
    });

    if (!res.ok) return null;

    const data = await res.json();
    const metadata = {
      version: data['dist-tags']?.latest || '0.0.0',
      description: data.description || '',
    };

    setInCache(cacheKey, metadata);
    return metadata;
  } catch (error) {
    console.error(`Error fetching metadata for ${packageName}:`, error);
    return null;
  }
}
