import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const serviceKey = process.env.SUPABASE_SERVICE_KEY || '';

if (!supabaseUrl || !serviceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey);

async function fetchWeeklyDownloads(packageName: string): Promise<number | null> {
  try {
    const res = await fetch(`https://api.npmjs.org/downloads/point/last-week/${packageName}`);
    if (!res.ok) return null;
    const data = await res.json();
    return data.downloads || 0;
  } catch (error) {
    console.error(`Error fetching downloads for ${packageName}:`, error);
    return null;
  }
}

async function sync() {
  console.log('🚀 Starting npm download sync...');
  const startTime = Date.now();

  // 1. Fetch all packages from Supabase
  const { data: packages, error } = await supabase
    .from('packages')
    .select('name');

  if (error || !packages) {
    console.error('Error fetching packages from DB:', error);
    process.exit(1);
  }

  console.log(`Found ${packages.length} packages to sync.`);

  const updates: { name: string; weekly_downloads: number; last_synced_at: string }[] = [];
  let failedCount = 0;

  // 2. Batch processing in groups of 20 to avoid rate limits
  const BATCH_SIZE = 20;
  for (let i = 0; i < packages.length; i += BATCH_SIZE) {
    const batch = packages.slice(i, i + BATCH_SIZE);
    console.log(`Processing batch ${Math.floor(i / BATCH_SIZE) + 1}...`);

    await Promise.all(
      batch.map(async (p) => {
        const downloads = await fetchWeeklyDownloads(p.name);
        if (downloads !== null) {
          updates.push({
            name: p.name,
            weekly_downloads: downloads,
            last_synced_at: new Date().toISOString()
          });
        } else {
          failedCount++;
        }
      })
    );

    // 500ms delay between batches
    if (i + BATCH_SIZE < packages.length) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  // 3. Bulk update Supabase
  if (updates.length > 0) {
    const { error: updateError } = await supabase
      .from('packages')
      .upsert(updates, { onConflict: 'name' });

    if (updateError) {
      console.error('Error updating Supabase:', updateError);
    } else {
      const duration = ((Date.now() - startTime) / 1000).toFixed(2);
      console.log(`✅ Sync complete!`);
      console.log(`Total packages synced: ${updates.length}`);
      console.log(`Failed: ${failedCount}`);
      console.log(`Duration: ${duration}s`);
    }
  }
}

sync();
