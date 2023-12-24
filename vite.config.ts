import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: 'src/index.ts',
            name: 'OGLImage',
            fileName: (format) => `oglimage.${format}.js`
        },
    }
});
