// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://canfxcahoyelwlahexrf.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhbmZ4Y2Fob3llbHdsYWhleHJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5Mjg2NDgsImV4cCI6MjA1OTUwNDY0OH0.5ui_bcMYWJlEDx8wtbxL8EApEoj7C3Ig3mJkkxWxx4s";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);