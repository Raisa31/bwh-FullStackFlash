import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy : {
      '/app': "http://127.0.0.1:5000",
      '/user' : "http://127.0.0.1:5000",
      '/messages' : "http://127.0.0.1:5000",
    },
  }
})
