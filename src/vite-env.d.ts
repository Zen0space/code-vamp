/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PUBLIC_MINIKIT_APP_ID: string
  readonly VITE_PUBLIC_WORLD_APP_URL: string
  readonly VITE_PUBLIC_WLD_ACTION: string
  readonly VITE_PUBLIC_WLD_APP_ID: string
  readonly WLD_CLIENT_ID: string
  readonly WLD_CLIENT_SECRET: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 