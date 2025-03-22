import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://ibyadohqjgtwglhycwqn.supabase.co";
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_API_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);
