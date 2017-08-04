module.exports = function(grunt) {

  'use strict';

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    minified: 'dist/currency.min.js',
    umd: 'dist/currency.umd.js',

    banner: '/*!\n' +
      ' * <%= pkg.name %> - v<%= pkg.version %>\n' +
      ' * <%= pkg.homepage %>\n' +
      ' *\n' +
      ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n'+
      ' * Released under MIT license\n'+
      ' */\n',

    'closure-compiler': {
      compile: {
        src: '<%= umd %>',
        dest: '<%= minified %>'
      },
      options: {
        compilation_level: 'SIMPLE',
        rewrite_polyfills: false
      }
    },

    concat: {
      dist: {
        files: {
          '<%= minified %>': '<%= minified %>'
        }
      },
      options: {
        stripBanners: true,
        banner: '<%= banner %>',
        // Allow for the original banner to be stripped
        process: function(src, filepath) {
          return filepath === 'currency.js' ? src.replace(/^\/\*!/, '/*') : src;
        }
      }
    }

  });

  require('google-closure-compiler').grunt(grunt);
  require('matchdep').filterAll('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('build', ['closure-compiler', 'concat', 'sync']);
  grunt.registerTask('default', ['build']);

};
