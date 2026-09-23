import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import packageJson from './package.json' with { type: 'json' }

function attachStylesheet(): Plugin {
  return {
    name: 'april-attach-stylesheet',
    apply: 'build',
    generateBundle(_options, bundle) {
      for (const file of Object.values(bundle)) {
        if (file.type === 'chunk' && file.fileName === 'index.js' && !file.code.includes("import './styles.css'")) {
          file.code = `import './styles.css';\n${file.code}`
        }
      }
    },
  }
}

export default defineConfig({
  define: {
    __APRIL_VERSION__: JSON.stringify(packageJson.version),
  },
  plugins: [react(), attachStylesheet()],
  build: {
    cssCodeSplit: false,
    assetsInlineLimit: 0,
    sourcemap: true,
    lib: {
      entry: {
        index: resolve(import.meta.dirname, 'src/index.js'),
        vite: resolve(import.meta.dirname, 'src/vite.js'),
      },
      formats: ['es'],
      fileName: (_format, entryName) => `${entryName}.js`,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        'react-router-dom',
        'vite',
      ],
      output: {
        assetFileNames: (assetInfo) => {
          const source = assetInfo.names?.[0] ?? ''
          if (source.endsWith('.css')) return 'styles.css'
          return 'assets/[name]-[hash][extname]'
        },
      },
    },
  },
})
