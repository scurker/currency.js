import pkg from '../package.json';
import babel from 'rollup-plugin-babel';
import banner from './banner';
import closure from './closure';

const input = 'src/currency.js';

export default [{
  input,
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ],
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
  input,
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
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
}];