module.exports = function(grunt) {
  "use strict";
  require("matchdep")
    .filterDev("grunt-*")
    .forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    watch: {
      options: {
        livereload: true
      },
      source: {
        files: ["src/*.js", "src/*/*.js", "Gruntfile.js"],
        tasks: ["build:js"]
      }
    },

    browserify: {
      dist: {
        src: [
          "node_modules/jquery/dist/jquery.min.js",
          "node_modules/leaflet/dist/leaflet.js",
          "src/blurredLocation.js"
        ],
        dest: "dist/BlurredLocation.js"
      }
    },

    jasmine: {
    	pivotal: {
      		src: 'dist/Leaflet.BlurredLocation.js',
      		options: {
	        specs: "spec/javascripts/*spec.js",
	        vendor: [
	          'node_modules/jquery/dist/jquery.js',
	          'node_modules/leaflet/dist/leaflet.js',
	          'node_modules/leaflet-blurred-location/dist/Leaflet.BlurredLocation.js',
	          'node_modules/jasmine-jquery/lib/jasmine-jquery.js'
	        ]
      		}
      	}
    },

    jshint: {
      all: ["Gruntfile.js", "dist/*.js", "spec/**/*.js"],
      options: {
        jshintrc: ".jshintrc"
      }
    }
  });

  /* Default (development): Watch files and build on change. */
  grunt.registerTask("default", ["watch", "jasmine"]);
  grunt.registerTask("test", ["jshint", "jasmine"]);
  grunt.registerTask("build", ["browserify:dist"]);
  grunt.loadNpmTasks("grunt-contrib-jasmine");
};

