module.exports = grunt => {

  require("load-grunt-tasks")(grunt);

  grunt.initConfig({

    clean: ["dist"],

    copy: {
      src_to_dist: {
        cwd: "src",
        expand: true,
        src: ["**/*", "css/*.css", "!**/*.ts", "!**/*.js", "!**/*.scss", "!img/**/*"],
        dest: "dist"
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

    run : {
      options: {
      },
      tests : {
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

  });

  grunt.registerTask("dev", [
    "ts:build",
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
    "copy:src_to_dist",
    "copy:pluginDef",
    "copy:img_to_dist"
  ]);
};