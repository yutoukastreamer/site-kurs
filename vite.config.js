import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

/* SPA-fallback: дублирует index.html в 404.html внутри папки сборки.
   Нужно для статических хостингов, которые на неизвестный путь отдают
   404.html — тогда приложение всё равно загрузится и React Router
   покажет нужную страницу (фикс ошибки 404 при обновлении страницы). */
function spaFallback404() {
  let root = process.cwd()
  let outDir = 'dist'
  return {
    name: 'spa-fallback-404',
    configResolved(config) {
      root = config.root
      outDir = config.build.outDir
    },
    closeBundle() {
      const index = resolve(root, outDir, 'index.html')
      const notFound = resolve(root, outDir, '404.html')
      if (existsSync(index)) copyFileSync(index, notFound)
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), spaFallback404()],
})
