import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/currency.js',
  plugins: [
    babel({
      exclude: 'node_modules/**',
      plugins: ['transform-object-assign']
    })
  ],
  targets: [
    {
      format: 'umd',
      dest: 'dist/currency.umd.js',
      moduleName: 'currency'
    }
  ]
};