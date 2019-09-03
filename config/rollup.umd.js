import pkg from '../package.json';
import babel from 'rollup-plugin-babel';
import banner from './banner';
import closure from './closure';

const input = 'src/currency.js';

const plugins = [
  babel({
    exclude: 'node_modules/**'
  })
];

export default [
  {
    input,
    plugins,
    output: [
      {
        format: 'umd',
        file: 'dist/currency.umd.js',
        name: 'currency',
        banner
      }
    ]
  },
  {
    input: 'src/currency.intl.js',
    plugins,
    output: [
      {
        format: 'umd',
        file: 'intl/currency.umd.js',
        name: 'currency',
        banner
      }
    ]
  },
  {
    input,
    plugins: [
      ...plugins,
      closure({
        compilationLevel: 'SIMPLE',
        rewritePolyfills: false
      })
    ],
    output: [
      {
        format: 'umd',
        file: pkg.browser,
        name: 'currency',
        banner
      }
    ]
  },
  {
    input: 'src/currency.intl.js',
    plugins: [
      ...plugins,
      closure({
        compilationLevel: 'SIMPLE',
        rewritePolyfills: false
      })
    ],
    output: [
      {
        format: 'umd',
        file: 'intl/currency.min.js',
        name: 'currency',
        banner
      }
    ]
  }
];