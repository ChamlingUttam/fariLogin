import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],

  server: {
    proxy: {
      "/api": {
        target: "https://backend-whqt.onrender.com",
        // target:"http://localhost:3001/api",
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
