/*global module:false*/

module.exports = function(grunt) {
	// Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		meta: {
			js_banner: '/**\n' +
				'* <%= pkg.name %>\n' +
				'*\n' +
				'* @version	<%= pkg.version %>\n' +
				'* @author	<%= pkg.author %>\n' +
				'* @require	jQuery 1.8.3\n' +
				'*			Hammer.js\n' +
				'* @license	<%= pkg.licenses[0].type %> - <%= pkg.licenses[0].url %>\n' +
				'**/\n'
		},
		sass: {
			dev: {
				files: {
					'assets/css/style.css': 'src/sass/style.scss',
					'assets/css/ie.css' : [
						'src/sass/style_small.scss',
						'src/sass/style_medium.scss',
						'src/sass/style_large.scss'
					]
				}
			}
		},
		cssmin: {
			compress: {
				files: {
					'assets/css/style.min.css': ['assets/css/style.css'],
					'assets/css/ie.min.css': ['assets/css/ie.css']
				}
			}
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
			all: ['Gruntfile.js', 'src/js/script.js']
		},
		uglify: {
			options: {
				mangle: {
					except: ['jQuery']
				}
			},
			lib: {
				files: {
					'assets/js/lib.min.js': ['src/js/libs/**/*.js']
				}
			},
			app: {
				files: {
					'assets/js/script.min.js': ['src/js/script.js']
				}
			}
		},
		watch: {
			sass: {
				files: ['src/sass/**/*.scss'],
				tasks: ['sass', 'cssmin']
			},
			script: {
				files: '<%= jshint.all %>',
				tasks: ['jshint', 'uglify:app']
			}
		}
	});

	// Load tasks
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task(s)
	grunt.registerTask('default', ['sass', 'cssmin', 'jasmine', 'jshint', 'uglify']);
	grunt.registerTask('test', ['jasmine', 'jshint']);
	grunt.registerTask('deploy', ['sass', 'cssmin', 'uglify']);
};