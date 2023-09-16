import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://rdwcskkcljgetkkoezno.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkd2Nza2tjbGpnZXRra29lem5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMzOTEwNjcsImV4cCI6MjAwODk2NzA2N30.X7tTcK9_XNYa-Upcceu7S3KmE98J5o_9kJ5-u2C_Rm4";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
