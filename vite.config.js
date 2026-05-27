import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Serve video files from the project root
  publicDir: 'public',
  server: {
    fs: {
      // Allow serving files from the project root (for video files)
      allow: ['.'],
    },
  },
})
