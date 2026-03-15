import { supabase } from '$lib/supabase';

export async function load() {
  const { data, error } = await supabase
    .from('entries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase error:', error.message);
    return { entries: [] }; // fallback so page still works
  }

  return {
    entries: data ?? []
  };
}