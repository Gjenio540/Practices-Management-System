import { build, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  //base: "/app",
  server: {
    host: true,
  },
  css: {
    modules: {
      scopeBehaviour: "local",
      localsConvention: "camelCase",
    }
  },
  build: {
      outDir: "./build",
  }
})