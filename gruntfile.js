module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
          src: {
            files: {
              'public/app.js': ['client/app.js'],
              'specs/bundle.js': ['specs/*Specs.js']
            },
            options: {
              transform: ['hbsfy'],
              debug: true
            }
          }
        },
        shell: {
            httpserver: {
                command: 'http-server'
            }
        },
        jshint: {
          all: ['Gruntfile.js', 'client/**/*.js', 'specs/*Specs.js'],
          options: {
            'asi': true,
            'laxbreak': true,
            'laxcomma': true
          },
        },
        watch: {
          browserify: {
            files: ["client/*.js", "./client/**/*.js", "./client/**/*.hbs", "specs/*Specs.js"],
            tasks: ['browserify','jshint']
          }
        },
        concurrent: {
            target1: ['watch','shell'],
            options: {
                logConcurrentOutput: true
            }
        }
    });
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-shell');
    grunt.registerTask('default', ['concurrent:target1']);

    grunt.event.on('watch', function(action, filepath, target) {
      grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });
}
