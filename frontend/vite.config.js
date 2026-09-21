import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Resolve o caminho do diretório atual em módulo ES
const __dirname = fileURLToPath(new URL('.', import.meta.url))

// Configuração do Vite para desenvolvimento e build do frontend
export default defineConfig({
  plugins: [
    react(),
    // Plugin auxiliar para espelhar a build tanto na raiz (/dist) quanto em (/frontend/dist)
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
  // Lê o arquivo .env localizado na raiz do projeto
  envDir: '../',
  build: {
    outDir: '../dist', // Gera os arquivos estáticos compilados diretamente na raiz do projeto
    emptyOutDir: true,
  },
})
