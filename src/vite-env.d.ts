/// <reference types="vite/client" />
/// <reference types="vitest" />

// Definiciones de variables de entorno
interface ImportMetaEnv {
  readonly VITE_MERCADOPAGO_PUBLIC_KEY: string;
  readonly VITE_BACKEND_URL?: string;
  readonly VITE_USE_REAL_BACKEND?: string;
  readonly VITE_WHATSAPP_NUMBER: string;
  // Agregar más variables de entorno aquí en el futuro
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.jpeg" {
  const content: string;
  export default content;
}

declare module "*.gif" {
  const content: string;
  export default content;
}
