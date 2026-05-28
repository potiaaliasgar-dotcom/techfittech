import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    minify: 'esbuild',
    sourcemap: false,
    target: 'es2020',
  }
})
