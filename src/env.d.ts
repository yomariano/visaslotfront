interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_WEBHOOK_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

export {} 