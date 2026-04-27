/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_PUBLISHABLE_KEY: string;
  // add more env variables here if you need them later
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}