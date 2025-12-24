import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // نقوم بتعريف المفتاح هنا ليتم استبداله في الكود أثناء عملية البناء (Build)
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || 'AIzaSyD95i8Q3p5r2y2IK3NGMOtM2LVViSlddzY')
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});