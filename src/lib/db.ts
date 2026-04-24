import { supabase } from './supabase';
import { Package, INITIAL_PACKAGES } from './packageData';

export async function getPackagesByStacks(stacks: string[]) {
  if (!supabase) return [];
  
  // We use GIN index on stack_tags in Supabase for efficient searching
  const { data, error } = await supabase
    .from('packages')
    .select('*')
    .contains('stack_tags', stacks);

  if (error) {
    console.error('Error fetching packages from DB:', error);
    return [];
  }

  return data.map(item => ({
    name: item.name,
    description: item.description,
    category: item.category,
    tier: item.tier,
    stackTags: item.stack_tags,
    npmUrl: item.npm_url,
    weeklyDownloads: item.weekly_downloads
  })) as Package[];
}

export async function upsertPackageDownloads(updates: { name: string; weeklyDownloads: number }[]) {
  if (!supabase) return;
  const { error } = await supabase
    .from('packages')
    .upsert(
      updates.map(u => ({ 
        name: u.name, 
        weekly_downloads: u.weeklyDownloads,
        last_synced_at: new Date().toISOString()
      })),
      { onConflict: 'name' }
    );

  if (error) console.error('Error upserting downloads:', error);
}

export async function seedPackages() {
  if (!supabase) {
    console.error('Supabase client not initialized. Check your .env variables.');
    return;
  }
  const { error } = await supabase
    .from('packages')
    .upsert(
      INITIAL_PACKAGES.map(pkg => ({
        name: pkg.name,
        description: pkg.description,
        category: pkg.category,
        tier: pkg.tier,
        stack_tags: pkg.stackTags,
        npm_url: pkg.npmUrl,
        weekly_downloads: 0
      })),
      { onConflict: 'name' }
    );

  if (error) console.error('Error seeding packages:', error);
  else console.log('Successfully seeded packages!');
}
