import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
// `base` is the repo name in production so assets resolve under
// https://piotrromanczuk.github.io/giarddesign/. Dev/preview stay at root.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/giarddesign/' : '/',
  plugins: [vue()],
}))
