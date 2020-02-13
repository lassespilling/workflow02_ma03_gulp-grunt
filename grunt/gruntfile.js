// :::::: Instructions ::::::
// Run 'npm install' to get node_modules
// Run 'grunt' to build dist folder and run server

module.exports = function(grunt) {
    // CSS
    grunt.loadNpmTasks('grunt-contrib-less'); 
    grunt.loadNpmTasks('grunt-autoprefixer'); 
    grunt.loadNpmTasks('grunt-contrib-cssmin'); 
    
    // HTML & IMG
    grunt.loadNpmTasks('grunt-contrib-htmlmin'); 
    grunt.loadNpmTasks('grunt-contrib-imagemin'); 

    // Browsersync & watch
    grunt.loadNpmTasks('grunt-contrib-watch'); 
    grunt.loadNpmTasks('grunt-browser-sync'); 

    grunt.initConfig({ // Initialize grunt with object
        less: { // Compile less
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/less/', 
                        src: ['**/*.less'], 
                        dest: 'dist/css/', 
                        ext: '.css' 
                    }
                ]
            }
        }, 
        cssmin: { // Minify css
            minify: {
                src: 'dist/css/style.css', // Source path
                dest: 'dist/css/style.css' // Destination path
            }
        },
        browserSync: {
            bsFiles: {
                src: [
                    'dist/*.html', // Location of html files
                    'dist/css/**/*.css', // Location of css
                ]
            },
            options: {
                watchTask: true,
                server: {
                    baseDir: 'dist' // Folder to load files from
                }
            }
        },
        htmlmin: {
            dist: {
               options: {
                  removeComments: true, // Remove comments
                  collapseWhitespace: true // Remove whitespace
               },
               files: [{
                  expand: true,
                  cwd: 'src', // Base path
                  src: '*.html', // All html files in base path root
                  dest: 'dist' // Destination path
               }]
            }
        },
        imagemin: {
            dist: {
               options: {
                 optimizationLevel: 5 // Higher is lower size
               },
               files: [{
                  expand: true, // Enable dynamic expansion
                  cwd: 'src/img', // Base path
                  src: ['**/*.{png,jpg,gif}'], // File type pattern
                  dest: 'dist/img'  // Destination
               }]
            }
        },
        autoprefixer: { // Add vendor prefixes
            options: {
              browsers: ['last 8 versions'] // How far back to support
            },
            dist: { 
              files: {
                'dist/css/style.css': 'dist/css/style.css'
              }
            }
        },
        watch: {
            options: {
                spawn: false // Speed up reaction time (more prone to failure)
            },
            img: {
                files: [ // Compress images on change
                    'src/img/**/*.jpg',
                    'src/img/**/*.png',
                    'src/img/**/*.gif'],
                    tasks: ['imagemin']
            },
            html: { // Look for changes in HTML, minify on change
                files: ['src/index.html'],
                tasks: ['htmlmin']
            },
            less: { // Look for changes in less, compile
                files: ['src/less/**/*.less'],
                tasks: ['less', 'autoprefixer','cssmin']
            }
        } 
    });
    // Build webpage into dist folder
    grunt.registerTask('build', ['less','autoprefixer','cssmin','imagemin','htmlmin']);

    // Build, watch and sync changes
    grunt.registerTask('default', ['build','browserSync','watch']);

}; 