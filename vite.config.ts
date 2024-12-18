import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Use a different port if 5173 is causing issues
    host: 'localhost', // Ensure the server binds to IPv4 instead of IPv6
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
