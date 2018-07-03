import pkg from '../package.json';
import babel from 'rollup-plugin-babel';
import banner from './banner';

export default {
  input: 'src/currency.js',
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ],
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
};