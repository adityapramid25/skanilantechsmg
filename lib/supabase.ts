import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://kmrpvefsmqowsrazhxmp.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttcnB2ZWZzbXFvd3NyYXpoeG1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1Mjc2MjgsImV4cCI6MjA4OTEwMzYyOH0.9YeWPI756Uwmj9EBUcdTGOr4huGBFrXEzZUiJYW5xYk";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
