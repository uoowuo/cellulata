const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const browserify = require('browserify');
const source = require('vinyl-source-stream');


// Execute all tasks by default
gulp.task('default', ['js', 'static'], function() {});

// Recompile files as they change
gulp.task('watch', function() {

    gulp.watch(['./src/**/*.js'], ['js']);
    gulp.watch(['./src/index.html', './src/styles/**/*.*', './src/images/**/*.*'], ['static']);
});

// Compile JS
gulp.task('js', function() {

    browserify('./src/app.js')
        .transform('babelify', {presets: ['es2015']})
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('./dist/'));
});

// Copy static files
gulp.task('static', function() {

    return gulp.src([
        './src/index.html',
        './src/styles/**/*.css',
        './src/images/**/*.*'
    ], {base: './src/'})
        .pipe(gulp.dest('./dist/'));
});