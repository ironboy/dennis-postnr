import zlib from 'zlib';
import { defineConfig } from 'vite';
import brotli from "rollup-plugin-brotli";

export default defineConfig({
  plugins: [brotli({
    test: /\.(js|css|html|txt|xml|json|svg|ico|ttf|otf|eot)$/,
    options: {
      params: {
        [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_GENERIC,
        [zlib.constants.BROTLI_PARAM_QUALITY]: 11
      },
      additional: [
        //  Manually list more files to compress alongside.
        '/public/data.json'
      ]
    },
    minSize: 1000
  })]
});