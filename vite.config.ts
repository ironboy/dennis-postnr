import { defineConfig, ViteDevServer } from "vite";

function serverPlugin() {
  return {
    name: 'server-plugin',
    configureServer(server: ViteDevServer) {
      server.middlewares.use((req, res, next) => {
        if (req.url!.endsWith('.wasm')) {
          res.setHeader('Content-Type', 'application/wasm');
        }
        next();
      });
    }
  };
}

export default defineConfig({
  assetsInclude: ['**/*.brotli'],
  plugins: [serverPlugin()]
});