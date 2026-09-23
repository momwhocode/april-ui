import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { aprilUi } from 'april-ui/vite'

export default defineConfig({
  plugins: [react(), aprilUi()],
  resolve: {
    // The local file: link sits next to this repo's own React. Dedupe so hooks share one copy.
    dedupe: ['react', 'react-dom', 'react-router-dom'],
  },
})
