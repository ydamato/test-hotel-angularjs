module.exports = function(grunt) {

	grunt.initConfig({	
	    less: {
	      build: {
	        files: [{
               expand: true,
               cwd: './src/less',
               src: 'main.less',
               dest: './src/css',
               ext: '.css'
	        }]
	      }
	    },
		watch: {
			build: {
				files: ["./src/less/*.less"],
   				options: {
                	livereload: true
        		}
			}
	  	},
	  	connect: {
    		server: {
      			options: {
        			port: 8000,
        			base: '.',
        			index: 'src/index.html'
      			}
    		}
  		}
	});
	
	grunt.event.on('watch', function(action, filepath, target) {
  		grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	
	grunt.registerTask('default', ['less', 'connect', 'watch']);
}