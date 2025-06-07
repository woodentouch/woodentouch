import path from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import tsconfigPaths from 'vite-tsconfig-paths';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const base = env.VITE_APP_BASE_PATH || '/';
  const isProduction = mode === 'production';

  // 👇 Import dynamique compatible CommonJS
  const svgIconsModule = await import('vite-plugin-svg-icons');
  // Récupérer la fonction via default ou via .createSvgIconsPlugin
  const createSvgIconsPlugin = svgIconsModule?.default?.createSvgIconsPlugin || svgIconsModule?.createSvgIconsPlugin || svgIconsModule?.default;

  if (typeof createSvgIconsPlugin !== 'function') {
    throw new Error('vite-plugin-svg-icons is not properly exported. Check your vite.config.ts and dependencies.');
  }

  return {
    base,
    plugins: [
      react({
        babel: {
          parserOpts: {
            plugins: ['decorators-legacy', 'classProperties'],
          },
        },
      }),
      vanillaExtractPlugin({
        identifiers: ({ debugId }) => `${debugId}`,
      }),
      tsconfigPaths(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
      isProduction &&
        visualizer({
          open: true,
          gzipSize: true,
          brotliSize: true,
          template: 'treemap',
        }),
    ].filter(Boolean),
    server: {
      open: true,
      host: true,
      port: 3001,
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          secure: false,
        },
      },
    },
    build: {
      target: 'esnext',
      minify: 'esbuild',
      sourcemap: !isProduction,
      cssCodeSplit: true,
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-core': ['react', 'react-dom', 'react-router'],
            'vendor-ui': ['antd', '@ant-design/icons', '@ant-design/cssinjs', 'framer-motion', 'styled-components'],
            'vendor-utils': ['axios', 'dayjs', 'i18next', 'zustand', '@iconify/react'],
            'vendor-charts': ['apexcharts', 'react-apexcharts'],
          },
        },
      },
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router', 'antd', '@ant-design/icons', 'axios', 'dayjs'],
      exclude: ['@iconify/react'],
    },
    esbuild: {
      drop: isProduction ? ['console', 'debugger'] : [],
      legalComments: 'none',
      target: 'esnext',
    },
  };
});
