import pkg from '../package.json';
import babel from 'rollup-plugin-babel';
import banner from './banner';

const plugins = [
  babel({
    exclude: 'node_modules/**'
  })
];

export default [
  {
    input: 'src/currency.js',
    plugins,
    output: [
      {
        format: 'es',
        file: pkg.module,
        banner
      },
      {
        format: 'cjs',
        file: pkg.main,
        banner
      }
    ]
  },
  {
    input: 'src/currency.intl.js',
    plugins,
    output: [
      {
        format: 'es',
        file: 'intl/currency.es.js'
      },
      {
        format: 'cjs',
        file: 'intl/currency.js'
      }
    ]
  }
];