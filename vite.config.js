import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({base}) => ({
  plugins: [react()],
  base,
  build: {
    chunkSizeWarningLimit: 2000, // set the limit to 2000 kBs
  },
}));
