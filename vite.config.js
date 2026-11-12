import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Port 8080 matches the "Launch Chrome against localhost" config in .vscode/launch.json
  server: { port: 8080, open: false },
})
