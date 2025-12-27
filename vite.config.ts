import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
// Changez proxy.target en fonction de votre environnement
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api/products': {  
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') 
      }
    }
  }
})