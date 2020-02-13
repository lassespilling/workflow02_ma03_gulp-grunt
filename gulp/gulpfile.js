// :::::: Instructions ::::::
// Run 'npm install' to get node_modules
// Run 'gulp' to build dist rom src and run server from dist

const gulp = require('gulp'); // GULP
const { src, dest } = require('gulp'); // GULP
const less = require('gulp-less'); // CSS
const minifyCSS = require('gulp-csso'); // CSS
const htmlmin = require('gulp-htmlmin'); // HTML
const imagemin = require('gulp-imagemin'); // Minify images
const browserSync = require('browser-sync').create(); // Browser reload

function optimg() { // Minify images
    return src('src/img/**/*') // Source path
    .pipe(imagemin()) // Run module
    .pipe(dest('dist/img/')) // Destination psth
}
function minify() {
    return src('src/*.html') // Source path
    .pipe(htmlmin({ collapseWhitespace: true , removeComments: true })) // Run module
    .pipe(dest('dist')) // Destination path
}
function css() {
    return src('src/less/*.less') // Source path
    .pipe(less()) // Compile LESS to CSS
    .pipe(minifyCSS()) // Minify CSS
    .pipe(dest('dist/css')) // Destination path
    .pipe(browserSync.stream()); // Update browser without reload
}
function browsersync() {
    browserSync.init({ // Initialize server
        server: "dist" // Folder to render files from
    });
}
function watch() { // Watch module
    gulp.watch('src/img/**/*').on('change', optimg); // Optimize new or changed images
    gulp.watch('src/less/**/*.less').on('change', css); // Compile less
    gulp.watch("src/*.html").on('change', minify); // Minify CSS
    gulp.watch('dist/img/**/*').on('change', browserSync.reload); // Reload browser to show new images
    gulp.watch("dist/*.html").on('change', browserSync.reload); // Reload browser to show HTML changes
}
gulp.task('default', gulp.series(optimg,css,minify,browsersync,watch))
// Run "gulp" to start
