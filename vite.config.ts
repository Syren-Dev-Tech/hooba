import { defineConfig } from 'vite';
import { viteConfigAliases } from '@syren-dev-tech/confetti/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    base: '/hooba/',
    plugins: [react()],
    resolve: {
        alias: {
            ...viteConfigAliases()
        }
    }
});
