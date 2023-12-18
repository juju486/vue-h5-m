import { fileURLToPath, URL } from 'node:url';

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import zipPack from "vite-plugin-zip-pack";

const CWD = process.cwd();

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {

  const { VITE_BASE_URL } = loadEnv(mode, CWD);

  return {
    plugins: [
      zipPack({ outDir: 'dist' }),
      vue(),
      vueJsx(),
      Components({
        resolvers: [VantResolver()],
      }),
    ],
    base: VITE_BASE_URL,
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      host: '0.0.0.0',
    }
  };
});
