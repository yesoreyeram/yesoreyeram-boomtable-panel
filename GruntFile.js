module.exports = grunt => {
  require("load-grunt-tasks")(grunt);

  grunt.loadNpmTasks("grunt-execute");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks('grunt-typescript');

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

    watch: {
      rebuild_all: {
        files: ["src/**/*", "plugin.json", "README.md"],
        tasks: ["default"],
        options: {
          spawn: false
        }
      }
    },

    typescript: {
      build: {
        src: ['src/**/*.ts', '!**/*.d.ts'],
        dest: 'dist/',
        options: {
          module: 'system',
          target: 'es5',
          declaration: false,
          emitDecoratorMetadata: true,
          experimentalDecorators: true,
          sourceMap: true,
          noImplicitAny: false,
        }
      }
    }

  });

  grunt.registerTask("default", [
    "clean",
    "copy:src_to_dist",
    "copy:pluginDef",
    "copy:img_to_dist",
    "typescript"
  ]);
};