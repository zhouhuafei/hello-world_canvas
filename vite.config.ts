import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    (() => {
      return {
        name: 'vite-plugin-set-tag-attribute',
        transform: <any>{
          order: 'pre',
          handler (fileContent, filePath) {
            if (filePath.includes('.vue')) {
              console.log('filePath：', filePath)
              const reg1 = /<div /g
              fileContent = fileContent.replace(reg1, `<div data-a="1"`)
              const reg2 = /<div>/g
              fileContent = fileContent.replace(reg2, `<div data-a="1" >`)
              return fileContent
            }
            return null
          }
        }
      }
    })()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
