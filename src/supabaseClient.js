import { createClient } from "@supabase/supabase-js";

// Tes clés Supabase
const supabaseUrl = "https://wcfielvrofhdaxgudprn.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjZmllbHZyb2ZoZGF4Z3VkcHJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3MjI0NjQsImV4cCI6MjA2MjI5ODQ2NH0.SJDL20UQId9aITUJPI6wJnCcc7vIeLyYByQ32p4QFbE";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

