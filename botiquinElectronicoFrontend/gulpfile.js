"use strict";
var gulp = require('gulp');
var gutil = require('gulp-util');
var livereload = require('gulp-livereload');
var watch = require('gulp-watch');
var http = require('http');
var ecstatic = require('ecstatic');
var inject = require('gulp-inject');
var del = require('del');

var watchGlob = 'index.html';
var resources = 'www/**/*.{js,html,css}';
var iosDest = 'platforms/browser/';
var libreriasCSS = ['node_modules/angular-material/angular-material.css'];
var injectOrderLibreriasCSS = ['www/vendor/angular-material.css'];

var librerias = ['node_modules/@uirouter/angularjs/release/angular-ui-router.js',
    'node_modules/angular/angular.js',
    'node_modules/angular-animate/angular-animate.js',
    'node_modules/angular-aria/angular-aria.js',
    'node_modules/angular-messages/angular-messages.js',
    'node_modules/angular-material/angular-material.js'];

var injectOrderLibrerias = ['www/vendor/angular.js',
    'www/vendor/angular-animate.js',
    'www/vendor/angular-aria.js',
    'www/vendor/angular-messages.js',
    'www/vendor/angular-ui-router.js',
    'www/vendor/angular-material.js'];

var DIST_PATH = ['platforms/browser/www', 'platforms/browser/index.html'];

gulp.task('clean', function() {
    // Borramos el directorio DIST_PATH completo...
    return del.sync(DIST_PATH);
});

gulp.task('update', function() {
    console.log('updating...');
    return gulp.src(resources)
        .pipe(gulp.dest(iosDest + '/www'))
        .pipe(livereload());
});

gulp.task('prepararLibrerias', function() {
    return gulp.src(librerias).pipe(gulp.dest('./www/vendor/'));
});

gulp.task('prepararLibreriasCSS', function() {
    return gulp.src(libreriasCSS).pipe(gulp.dest('./www/vendor/'));
});

gulp.task('updateIndex', function() {
    console.log('updating index...');
    return gulp.src(watchGlob).pipe(gulp.dest(iosDest));
});

gulp.task('indexJS', ['prepararLibrerias'], function () {
    console.log('Generating JS');
    var target = gulp.src('./platforms/browser/index.html');
    var appJS = ['./www/js/*.module.js',
        './www/js/**/*.controller.js',
        './www/js/**/*.component.js',
        './www/js/**/*.js'];
    var injectJS = injectOrderLibrerias.concat(appJS);
    var sources = gulp.src(injectJS, {read: false});

    return target.pipe(inject(sources))
        .pipe(gulp.dest('./platforms/browser/'));
});

gulp.task('indexJSSinLibrerias', function () {
    console.log('Generating JS');
    var target = gulp.src('./platforms/browser/index.html');
    var appJS = ['./www/js/*.module.js',
        './www/js/**/*.controller.js',
        './www/js/**/*.component.js',
        './www/js/**/*.js'];
    var injectJS = injectOrderLibrerias.concat(appJS);
    var sources = gulp.src(injectJS, {read: false});

    return target.pipe(inject(sources))
        .pipe(gulp.dest('./platforms/browser/'));
});

gulp.task('indexSASS', ['prepararLibreriasCSS'], function() {
    console.log('Generating Sass');
    var target = gulp.src('./platforms/browser/index.html');
    var appCSS = ['./www/**/*.css'];
    var injectCSS = injectOrderLibreriasCSS.concat(appCSS);
    var sources = gulp.src(injectCSS, {read: false});
    return target.pipe(inject(sources))
        .pipe(gulp.dest('./platforms/browser/'));
});

gulp.task('indexSASSSinLibrerias', function() {
    console.log('Generating Sass');
    var target = gulp.src('./platforms/browser/index.html');
    var appCSS = ['./www/**/*.css'];
    var injectCSS = injectOrderLibreriasCSS.concat(appCSS);
    var sources = gulp.src(injectCSS, {read: false});
    return target.pipe(inject(sources))
        .pipe(gulp.dest('./platforms/browser/'));
});


gulp.task('watch', function() {
    // start the livereload server
    livereload.listen();
    gulp.watch(resources, ['indexJSSinLibrerias', 'indexSASSSinLibrerias', 'update']);
});

gulp.task('server', ['clean', 'updateIndex', 'indexJS', 'indexSASS'], function() {
    var port = 8080;
    var url = "http://localhost:" + port + "/";
    http.createServer(ecstatic({
        root: "platforms/browser/",
        cache: 0
    })).listen(port);
    gutil.log(gutil.colors.red("HTTP server listening on " + port));
});

// default - start everything
gulp.task('default', [
    'server',
    'watch'
]);