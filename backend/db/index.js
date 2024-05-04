import { createClient } from "@supabase/supabase-js";

export const init = async () => {
  // Create a single supabase client for interacting with your database
  const supabase = createClient(
    "http://localhost:8000",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE"
  );

  const { data, error } = await supabase.from("countries").select();

  console.log(data);
  console.log(error);
};
