const compile = require('google-closure-compiler-js').compile;

export default function(flags = {}) {
  return {
    name: 'closure-compiler-js',
    transformChunk(src) {
      flags = Object.assign({}, flags);
      flags.jsCode = [{ src }];
      return { code: compile(flags).compiledCode };
    }
  };
}