import * as esbuild from 'esbuild-wasm';

import { unpkgPathPlugin } from './plugins/unpkgPathPlugin';
import { fetchPlugin } from './plugins/fetch-plugin';

let service: any;

const bundler = async (rawCode: string) => {
  if (!service) {
    await esbuild
      .initialize({
        worker: true,
        wasmURL: '/esbuild.wasm',
      })
      .then(() => (service = true));
  }

  try {
    const result = await esbuild
      .build({
        entryPoints: ['index.js'],
        bundle: true,
        write: false,
        plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
        define: {
          'process.env.NODE_ENV': '"production"',
          global: 'window',
        },
        jsxFactory: '_React.createElement',
        jsxFragment: '_React.Fragment',
      })
      .then((result: any) => result.outputFiles[0].text);
    return { code: result, err: '' };
  } catch (err: any) {
    return { code: '', err: err.message };
  }
};

export default bundler;
