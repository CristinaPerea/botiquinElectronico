"use strict";
var gulp = require('gulp');
var gutil = require('gulp-util');
var livereload = require('gulp-livereload');
var watch = require('gulp-watch');
var http = require('http');
var ecstatic = require('ecstatic');
var inject = require('gulp-inject');


var watchGlob = 'www/**/*.{js,html,css}';
var iosDest = 'platforms/browser/www';

gulp.task('update', function() {
    return gulp.src(watchGlob)
        .pipe(gulp.dest(iosDest))
        .pipe(livereload());
});

gulp.task('indexJS', function () {
    var target = gulp.src('./www/index.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var sources = gulp.src(['./www/js/*.module.js',
        './www/js/**/*.component.js',
        './www/js/**/*.js'], {read: false});

    return target.pipe(inject(sources))
        .pipe(gulp.dest('./www'));
});

gulp.task('indexSASS', function() {
    var target = gulp.src('./www/index.html');
    var sources = gulp.src(['./www/js/*.module.js',
        './www/js/**/*.component.js',
        './www/js/**/*.js',
        './www/**/*.css'], {read: false});
    return target.pipe(inject(sources))
        .pipe(gulp.dest('./www'));
});

gulp.task('watch', function() {
    // start the livereload server
    livereload.listen();
    gulp.watch(watchGlob, ['indexJS', 'indexSASS', 'update']);
});

gulp.task('server', function() {
    var port = 8080;
    var url = "http://localhost:" + port + "/";
    http.createServer(ecstatic({
        root: "platforms/browser/www/",
        cache: 0
    })).listen(port);
    gutil.log(gutil.colors.red("HTTP server listening on " + port));
});

// default - start everything
gulp.task('default', [
    'server',
    'watch'
]);