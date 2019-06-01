const compile = require('google-closure-compiler-js');

export default function(flags = {}) {
  return {
    name: 'closure-compiler-js',
    renderChunk(src) {
      flags = Object.assign({}, flags);
      flags.jsCode = [{ src }];
      return { code: compile(flags).compiledCode };
    }
  };
}