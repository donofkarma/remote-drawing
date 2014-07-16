/*global module:false*/

module.exports = function(grunt) {
    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            main: {
                files: {
                    'assets/css/style.css': 'src/sass/style.scss',
                    'assets/css/ie.css' : 'src/sass/ie.scss'
                }
            }
        },
        cssmin: {
            main: {
                files: {
                    'assets/css/style.css': ['assets/css/style.css'],
                    'assets/css/ie.css': ['assets/css/ie.css']
                }
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true
                }
            },
            all: [
                'Gruntfile.js',
                'src/js/script.js'
            ]
        },
        jasmine: {
            tests: {
                src: 'src/js/**/*.js',
                options: {
                    specs: 'test/spec/**/*_spec.js',
                    helpers: 'test/spec/**/*_helper.js'
                }
            }
        },
        uglify: {
            options: {
                mangle: {
                    except: ['jQuery']
                }
            },
            deploy: {
                files: {
                    'assets/js/libs.js': ['src/js/libs/**/*.js'],
                    'assets/js/script.js': ['src/js/script.js']
                }
            }
        },
        copy: {
            // fonts: {
            //     files: [
            //         {
            //             expand: true,
            //             cwd: 'src/fonts/',
            //             src: ['**'],
            //             dest: 'assets/fonts/'
            //         }
            //     ]
            // },
            images: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/images/public/',
                        src: ['**'],
                        dest: 'assets/images/'
                    }
                ]
            }
        },
        watch: {
            sass: {
                files: ['src/sass/**/*.scss'],
                tasks: 'sass'
            },
            script: {
                files: '<%= jshint.all %>',
                tasks: ['jshint', 'uglify']
            }
        }
    });

    // Load tasks
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s)
    grunt.registerTask('test', ['jshint'/*, 'jasmine'*/]);
    grunt.registerTask('build', ['sass', 'cssmin', 'uglify', 'copy']);
    grunt.registerTask('default', ['test', 'build']);
};
