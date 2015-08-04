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

    closureCompiler: {
      compile: {
        src: 'currency.js',
        dest: 'currency.min.js'
      },
      options: {
        compilerFile: 'lib/compiler.jar',
        compilation_level: 'ADVANCED_OPTIMIZATIONS'
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

    jshint: {
      options: {
        jshintrc: true
      },
      files: {
        src: ['currency.js', 'Gruntfile.js', 'test/*.js']
      }
    },

    qunit: {
      files: ['test/*.html']
    },

    watch: {
      scripts: {
        files: ['currency.js'],
        tasks: ['qunit', 'jshint']
      }
    }

  });

  require('matchdep').filterAll('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['qunit', 'jshint', 'closureCompiler', 'concat', 'sync']);

};
