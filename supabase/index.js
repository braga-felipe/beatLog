import {createClient} from '@supabase/supabase-js';
import {API_SUPABASE_KEY, API_SUPABASE_URL} from '@env';
const supabaseUrl = API_SUPABASE_URL;
const supabaseKey = API_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);
