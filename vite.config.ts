import { defineConfig, Plugin, splitVendorChunkPlugin } from 'vite'
// import { createHtmlPlugin } from 'vite-plugin-html'
// import olo from './olo.html'
// import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
  // plugins: [splitVendorChunkPlugin()],
  build: {
    // sourcemap: true,
    chunkSizeWarningLimit: 5000,
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // console.log(id)
          // creating a chunk to @open-ish deps. Reducing the vendor chunk size
          if (id.includes('@faker-js/faker')) {
            return 'faker';
          }
          
        },

      },
    },
  },
  base: './',
  assetsInclude: ['**/*.gltf'],
  // public: ['**/*.gltf']
})
