const sass = require('node-sass');

module.exports = grunt => {

  require("load-grunt-tasks")(grunt);

  let plugin = grunt.file.readJSON('plugin.json');
  let pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({

    clean: ["dist", ".tmp"],

    copy: {
      src_to_dist: {
        cwd: "src",
        expand: true,
        src: ["partials/*.html"],
        dest: "dist"
      },
      stylesheets: {
        cwd: ".tmp/compile_output/css/",
        expand: true,
        src: ["*.css"],
        dest: "dist/css"
      },
      pluginDef: {
        expand: true,
        src: ["plugin.json", "README.md"],
        dest: "dist"
      },
      img_to_dist: {
        cwd: "src",
        expand: true,
        src: ["img/**/*"],
        dest: "dist/src/"
      }
    },

    run: {
      options: {
      },
      tests: {
        exec: "npm run test"
      }
    },

    watch: {
      rebuild_all: {
        files: ["src/**/*", "plugin.json", "README.md"],
        tasks: ["dev"],
        options: {
          debounceDelay: 250,
          spawn: false
        }
      }
    },

    sass: {
      build: {
        options: {
          debugInfo: true,
          check: true,
          implementation: sass,
          sourceMap: false
        },
        files: {
          '.tmp/compile_output/css/default.dark.css': 'src/css/default.dark.scss',
          '.tmp/compile_output/css/default.light.css': 'src/css/default.light.scss'
        }
      }
    },

    tslint: {
      options: {
        configuration: "tslint.json"
      },
      files: {
        src: ['src/**/*.ts'],
      },
    },

    ts: {
      build: {
        tsconfig: './tsconfig.json'
      }
    },

    uglify: {
      options: {
        mangle: false
      },
      ts: {
        options: {
          sourceMap: false,
          banner: `/*! 
Plugin Name : ${plugin.name}
Plugin ID : ${pkg.name}
Plugin URL : ${plugin.info.links.map(l => l.url).join(", ")}
Plugin Author : ${ plugin.info.author.name + " " + plugin.info.author.url}
Plugin Version : v${ pkg.version}
Built on : <%= grunt.template.today("yyyy-mm-dd HH:MM") %>
*/
`
        },
        files: [{
          expand: true,
          cwd: '.tmp/compile_output/typescript',
          src: '**/*.js',
          dest: 'dist/'
        }]
      }
    }

  });

  grunt.registerTask("dev", [
    "ts:build",
    "uglify:ts",
    "copy:src_to_dist",
    "copy:pluginDef",
    "copy:img_to_dist"
  ]);

  grunt.registerTask("test", [
    "run:tests",
    "tslint",
  ]);

  grunt.registerTask("default", [
    "clean",
    "run:tests",
    "tslint",
    "ts:build",
    "uglify:ts",
    "sass:build",
    "copy:src_to_dist",
    "copy:stylesheets",
    "copy:pluginDef",
    "copy:img_to_dist"
  ]);

  grunt.registerTask("release", [
    "default"
  ]);

};