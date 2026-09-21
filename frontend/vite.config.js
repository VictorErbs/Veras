import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-dist',
      closeBundle() {
        try {
          const src = path.resolve(__dirname, '../dist')
          const dest = path.resolve(__dirname, 'dist')
          fs.cpSync(src, dest, { recursive: true })
        } catch (e) {
          console.error("Erro ao sincronizar dist:", e)
        }
      }
    }
  ],
  envDir: '../',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
})
