'use server';

import { getServiceSupabase } from '@/lib/supabase';

export async function checkAdminStatus(userId: string) {
  const supabase = getServiceSupabase();
  
  try {
    const { data: { user }, error: userError } = await supabase.auth.admin.getUserById(userId);
    
    if (user && (
      user.role === 'admin' || 
      user.app_metadata?.role === 'admin' || 
      user.user_metadata?.role === 'admin'
    )) {
      return true;
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();

    // Silently ignore errors from profiles table (e.g., table doesn't exist or row not found)
    // as this is just a fallback check

    return data?.role === 'admin';
  } catch (err) {
    // Only log truly unexpected errors
    return false;
  }
}

export async function saveFlashSale(payload: any) {
  const supabase = getServiceSupabase();
  
  // Delete all existing discounts to ensure the new one replaces everything
  const { data: existing } = await supabase.from('active_discounts').select('id');
  if (existing && existing.length > 0) {
    const ids = existing.map(e => e.id);
    await supabase.from('active_discounts').delete().in('id', ids);
  }

  const { error } = await supabase.from('active_discounts').insert([payload]);
  if (error) {
    console.error('Error saving flash sale:', JSON.stringify(error));
    throw new Error(error.message || 'Failed to save flash sale');
  }
}

export async function stopFlashSale() {
  const supabase = getServiceSupabase();
  
  const { data: existing } = await supabase.from('active_discounts').select('id');
  if (existing && existing.length > 0) {
    const ids = existing.map(e => e.id);
    const { error } = await supabase.from('active_discounts').delete().in('id', ids);
    if (error) {
      console.error('Error stopping flash sale:', JSON.stringify(error));
      throw new Error(error.message || 'Failed to stop flash sale');
    }
  }
}

export async function saveFeaturedProducts(payload: any) {
  const supabase = getServiceSupabase();
  
  // Ensure the bucket exists (ignoring errors if it already does)
  await supabase.storage.createBucket('app-settings', { public: true });

  const { error } = await supabase.storage
    .from('app-settings')
    .upload('featured-products.json', JSON.stringify(payload), { upsert: true, contentType: 'application/json' });
    
  if (error) {
    console.error('Error saving featured products:', JSON.stringify(error));
    throw new Error(error.message || 'Failed to save featured products');
  }
}
