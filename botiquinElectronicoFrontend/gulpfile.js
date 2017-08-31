"use strict";

// Dependencias

var gulp = require('gulp');
var gutil = require('gulp-util');
var livereload = require('gulp-livereload');
var watch = require('gulp-watch');
var http = require('http');
var ecstatic = require('ecstatic');
var inject = require('gulp-inject');
var del = require('del');
var wait = require('gulp-wait');
var sass = require('gulp-sass');

// Variables globales

var watchGlob = 'index.html';
var resources = 'www/**/*.{js,html,css,sass}';
var iosDest = 'platforms/browser/';
var libreriasCSS = ['node_modules/angular-material/angular-material.css',
    'node_modules/material-design-icons/iconfont/*'];
var injectOrderLibreriasCSS = ['www/vendor/material-icons.css',
    'www/vendor/angular-material.css',
    'www/vendor/MaterialIcons*'];
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
    return gulp.src(resources)
        .pipe(gulp.dest(iosDest + '/www'))
        .pipe(wait(1500))
        .pipe(livereload());
});

gulp.task('prepararLibrerias', function() {
    return gulp.src(librerias).pipe(gulp.dest('./www/vendor/'));
});

gulp.task('prepararLibreriasCSS', function() {
    return gulp.src(libreriasCSS).pipe(gulp.dest('./www/vendor/'));
});

gulp.task('updateIndex', function() {
    return gulp.src(watchGlob).pipe(gulp.dest(iosDest));
});

gulp.task('indexJS', ['prepararLibrerias'], function () {
    var target = gulp.src('./platforms/browser/index.html');
    var appJS = ['./www/js/*.module.js',
        './www/js/*.router.js',
        './www/js/**/*.controller.js',
        './www/js/**/*.component.js',
        './www/js/**/*.js'];
    var injectJS = injectOrderLibrerias.concat(appJS);
    var sources = gulp.src(injectJS, {read: false});

    return target.pipe(inject(sources))
        .pipe(gulp.dest('./platforms/browser/'));
});

gulp.task('indexJSSinLibrerias', function () {
    var target = gulp.src('./platforms/browser/index.html');
    var appJS = ['./www/js/*.module.js',
        './www/js/*.router.js',
        './www/js/**/*.controller.js',
        './www/js/**/*.component.js',
        './www/js/**/*.js'];
    var injectJS = injectOrderLibrerias.concat(appJS);
    var sources = gulp.src(injectJS, {read: false});

    return target.pipe(inject(sources))
        .pipe(gulp.dest('./platforms/browser/'));
});

gulp.task('copiaFuentesMaterial', function() {
    return gulp.src(['./www/vendor/Material*.*']).pipe(gulp.dest('./platforms/browser/www/vendor'));
});

gulp.task('indexSASS', ['prepararLibreriasCSS', 'copiaFuentesMaterial', 'compilaSass'], function() {
    var target = gulp.src('./platforms/browser/index.html');
    var appCSS = ['./www/css/*.css', './www/js/**/*.css'];
    var injectCSS = injectOrderLibreriasCSS.concat(appCSS);
    var sources = gulp.src(injectCSS, {read: false});
    return target.pipe(inject(sources))
        .pipe(gulp.dest('./platforms/browser/'));
});

gulp.task('indexSASSSinLibrerias', ['compilaSass'], function() {
    var target = gulp.src('./platforms/browser/index.html');
    var appCSS = ['./www/**/*.css', './www/js/**/*.css'];
    var injectCSS = injectOrderLibreriasCSS.concat(appCSS);
    var sources = gulp.src(injectCSS, {read: false});
    return target.pipe(inject(sources))
        .pipe(gulp.dest('./platforms/browser/'));
});

gulp.task('compilaSass', function() {
    return gulp.src('./www/js/**/*.sass')
        .pipe(sass())
        .pipe(gulp.dest(function (file) {
            return file.base;
        }));
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(resources, ['indexJSSinLibrerias', 'indexSASSSinLibrerias', 'update']);
});

gulp.task('copiarImagenes', function () {
   return gulp.src('./www/img/**/*')
       .pipe(gulp.dest('./platforms/browser/www/img/'));
});
gulp.task('server', ['clean', 'copiarImagenes', 'updateIndex', 'indexJS', 'indexSASS'], function() {
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