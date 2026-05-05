const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.log("No Supabase URL or Key found in env.");
  process.exit(0);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTables() {
  // Let's try to fetch from a hypothetic custom_images table
  let { data, error } = await supabase.from('custom_images').select('*');
  console.log('custom_images:', error ? error.message : data);
  
  // What about product_images
  let res2 = await supabase.from('product_images').select('*');
  console.log('product_images:', res2.error ? res2.error.message : res2.data);
}

checkTables();
