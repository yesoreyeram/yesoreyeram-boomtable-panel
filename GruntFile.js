const sass = require("node-sass");

module.exports = grunt => {
  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    clean: ["dist"],

    copy: {
      src_to_dist: {
        cwd: "src",
        expand: true,
        src: ["**/*", "!**/*.ts", "!**/*.js", "!**/*.scss", "!img/**/*"],
        dest: "dist"
      },
      pluginDef: {
        expand: true,
        src: ["README.md", "CHANGELOG.md"],
        dest: "dist"
      },
      img_to_dist: {
        cwd: "src",
        expand: true,
        src: ["img/**/*"],
        dest: "dist/src/"
      },
      logo_to_dist: {
        cwd: "src",
        expand: true,
        src: ["img/logo.png"],
        dest: "dist/"
      }
    },

    watch: {
      rebuild_all: {
        files: ["src/**/*", "README.md", "CHANGELOG.md"],
        tasks: [
          "ts:default",
          "sass:build",
          "copy:src_to_dist",
          "copy:pluginDef",
          "copy:img_to_dist"
        ],
        options: {
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
          "dist/css/default.dark.css": "src/css/default.dark.scss",
          "dist/css/default.light.css": "src/css/default.light.scss"
        }
      }
    },

    tslint: {
      options: {
        configuration: "tslint.json"
      },
      files: {
        src: ["src/**/*.ts"]
      }
    },

    ts: {
      default: {
        tsconfig: "./tsconfig.json"
      }
    }

  });

  grunt.registerTask("test", ["run:tests", "tslint"]);

  grunt.registerTask("default", [
    "clean",
    "tslint",
    "ts:default",
    "sass:build",
    "copy:src_to_dist",
    "copy:pluginDef",
    "copy:img_to_dist",
    "copy:logo_to_dist"
  ]);
};
