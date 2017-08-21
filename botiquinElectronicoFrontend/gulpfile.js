"use strict";
var gulp = require('gulp');
var gutil = require('gulp-util');
var livereload = require('gulp-livereload');
var watch = require('gulp-watch');
var http = require('http');
var ecstatic = require('ecstatic');


var watchGlob = 'www/**/*.{js,html,css}';
var iosDest = 'platforms/browser/www';

gulp.task('update', function() {
    return gulp.src(watchGlob)
        .pipe(gulp.dest(iosDest))
        .pipe(livereload());
});

gulp.task('watch', function() {
    // start the livereload server
    livereload.listen();
    gulp.watch(watchGlob, ['update']);
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