'use server';

import { revalidatePath, unstable_noStore as noStore } from 'next/cache';
import { getServiceSupabase } from '@/lib/supabase';

export async function getDiscount() {
  noStore();
  const supabase = getServiceSupabase();
  const { data, error } = await supabase
    .from('active_discounts')
    .select('*')
    .eq('id', '00000000-0000-0000-0000-000000000001')
    .maybeSingle();

  if (error) {
    console.error('Error fetching discount:', JSON.stringify(error));
    return null;
  }

  return data;
}

export async function updateDiscount(formData: FormData) {
  const supabase = getServiceSupabase();
  const productId = formData.get('product_id') as string;
  const discountPrice = parseFloat(formData.get('discount_price') as string);
  const startDate = formData.get('start_date') as string;
  const endDate = formData.get('end_date') as string;

  const { error } = await supabase
    .from('active_discounts')
    .upsert({
      id: '00000000-0000-0000-0000-000000000001',
      product_id: productId,
      discount_price: discountPrice,
      start_date: startDate,
      end_date: endDate,
    });

  if (error) {
    console.error('Error updating discount:', JSON.stringify(error));
    throw new Error('Failed to update discount');
  }

  revalidatePath('/');
}
