/*global module:false*/
module.exports = function(grunt) {

  'use strict';

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    banner: '/*!\n' +
      ' * <%= pkg.name %> - v<%= pkg.version %>\n' +
      ' * <%= pkg.homepage %>\n' +
      ' *\n' +
      ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n'+
      ' * Released under MIT license\n'+
      ' */\n',

    'closure-compiler': {
      compile: {
        src: 'currency.js',
        dest: 'currency.min.js'
      },
      options: {
        compilation_level: 'SIMPLE'
      }
    },

    concat: {
      dist: {
        files: {
          'currency.js': 'currency.js',
          'currency.min.js': 'currency.min.js'
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
    },

    mochaTest: {
      options: {
        reporter: 'spec'
      },
      test: {
        src: ['test/**/*.js']
      }
    },

    jshint: {
      options: {
        jshintrc: true
      },
      files: {
        src: ['currency.js', 'Gruntfile.js', 'test/*.js']
      }
    },

    watch: {
      scripts: {
        files: ['currency.js'],
        tasks: ['qunit', 'jshint']
      }
    }

  });

  require('google-closure-compiler').grunt(grunt);
  require('matchdep').filterAll('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('build', ['closure-compiler', 'concat', 'sync']);
  grunt.registerTask('default', ['jshint', 'mochaTest', 'build']);

};
