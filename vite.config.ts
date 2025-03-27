import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    base: './',
    build: {
        outDir: 'dist-react',
    },
    server: {
        port: 2325,
        strictPort: true
    }
})
