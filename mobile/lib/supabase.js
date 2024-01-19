import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://sxpjdntijiyvswspflzb.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4cGpkbnRpaml5dnN3c3BmbHpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcwMjQyMjEsImV4cCI6MjAxMjYwMDIyMX0.YucOAQs8ilaVQQVDo8thWVFWUa_1LwI_4gnwqAOQczI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
