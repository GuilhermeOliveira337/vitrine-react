import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base: o site é servido em /vitrine-react/ no GitHub Pages,
// e na raiz quando roda localmente.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/vitrine-react/' : '/',
  plugins: [react(), tailwindcss()],
}))
