import { readFileSync } from 'fs';
import babel from 'rollup-plugin-babel';

const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));

export default {
  entry: 'src/currency.js',
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ],
  targets: [
    {
      format: 'cjs',
      dest: pkg.main
    },
    {
      format: 'umd',
      dest: pkg.browser,
      moduleName: 'currency'
    }
  ]
};