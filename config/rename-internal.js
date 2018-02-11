'use strict';

module.exports = function({ types: t }) {
  return {
    visitor: {
      MemberExpression(path) {
        if(t.isThisExpression(path.node.object)) {
          path.traverse({
            Identifier(path) {
              if(['_precision', '_settings'].includes(path.node.name)) {
                path.node.name = { _precision: 'p', _settings: 's' }[path.node.name];
              }
            }
          });
        }
      }
    }
  };
};
