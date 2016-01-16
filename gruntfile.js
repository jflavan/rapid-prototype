module.exports = function(grunt) {
  grunt.initConfig({

    uglify: {
      target: {
        files: {
          'builds/development/js/script.js': ['components/scripts/*'] //dest : source
        }
      }
    }, //uglify (minify) js

    bower_concat: {
      all: {
        dest: 'builds/developement/js/_bower.js',
        cssDest: 'builds/developement/css/_bower.css',
        mainFiles: {
          bootstrap: ['dist/css/bootstrap.min.css', 'dist/js/bootstrap.min.js'], //fix for bootstrap 3.3.5-3.3.6
        }
      }
    }, //bundle & concat all the bower components

    sass: { // Task
      dist: { // Target
        options: { // Target options
          style: 'compressed'
        },
        files: { // Dictionary of files
          'builds/development/css/style.css': 'components/sass/style.scss' // 'destination': 'source'
        }
      }
    }, //sass processing

    connect: {
      server: {
        options: {
          hostname: 'localhost',
          port: 8080,
          base: 'builds/development/',
          livereload: true
        }
      }
    }, //start local server

    watch: {
      options: {
        spawn: false,
        livereload: true
      },
      scripts: {
        files: ['builds/development/**/*.html',
          'components/scripts/**/*.js',
          'components/sass/**/*.scss'
        ],
        tasks: ['uglify', 'sass']
      }
    }, //watch files for changes and re-run tasks

    jshint: {
      all: ['components/scripts/**/*.js']
    }, // js linting

    scsslint: {
      allFiles: ['components/sass/**/*.scss'],
      options: {
        colorizeOutput: true
      }
    }, // scss linting

  }); //initConfig

  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-scss-lint');

  grunt.registerTask('default', ['jshint', 'scsslint', 'sass', 'bower_concat', 'uglify', 'connect', 'watch']);

}; //wrapper function
