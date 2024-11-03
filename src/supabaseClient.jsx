// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://diiycmnhmrutuhyfrvar.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpaXljbW5obXJ1dHVoeWZydmFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgzMDE0NDMsImV4cCI6MjA0Mzg3NzQ0M30.Ke4A0jEWiCwJ7mH-GEYsLQUfKlOnJElghOUsOz4DFso';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
