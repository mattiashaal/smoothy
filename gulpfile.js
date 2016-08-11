/*  Gulp setup
============================================================================ */

/* Load plugins */
var gulp = require('gulp');
var concat = require('gulp-concat');
var header = require('gulp-header');
var plumber = require('gulp-plumber');
var uglify = require("gulp-uglify");
var package = require('./package.json');

/* Banner */
var banner = [
    '/* ',
        '<%= package.name %> ',
        'v<%= package.version %> | ',
        '© ' + new Date().getFullYear() + ' <%= package.author %> | ',
        '<%= package.repository.url %>',
    ' */',
    '\n'
].join('');

gulp.task("scripts", function() {
    gulp.src([
        "src/smoothy.js"
    ])
    .pipe(plumber())
    .on("error", function(err) {
        console.log(err.message);
    })
    .pipe(concat("smoothy.min.js"))
    .pipe(uglify())
    .pipe(header(banner, {
        package: package
    }))
    .pipe(gulp.dest("dist"))
});

/* Run Gulp */
gulp.task('default', ['scripts']);
