/**
 * API_URL resolves in this order:
 *   1. VITE_API_URL env var if set
 *   2. Falls back to Render backend for production deployments
 *
 * Development (frontend/.env):
 *   VITE_API_URL=http://127.0.0.1:8000
 *
 * Vercel production (Vercel dashboard env vars):
 *   VITE_API_URL=https://qr-generator-sxwa.onrender.com
 */
export const API_URL =
  import.meta.env.VITE_API_URL || "https://qr-generator-sxwa.onrender.com";