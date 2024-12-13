import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "tailwindcss";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // css: {
  //   modules: {
  //     localsConvention: "camelCase",
  //     generateScopedName: "[local]_[hash:base64:2]"
  //   }
  // }
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
})
