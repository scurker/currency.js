import babel from 'rollup-plugin-babel';

export default {
  input: 'src/currency.js',
  plugins: [
    babel({
      exclude: 'node_modules/**',
      plugins: ['transform-object-assign']
    })
  ],
  output: [
    {
      format: 'umd',
      file: 'dist/currency.umd.js',
      name: 'currency'
    }
  ]
};