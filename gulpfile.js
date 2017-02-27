// --------------------------------------------------------
// Gulp setup
// --------------------------------------------------------

/* Load plugins */
var gulp    = require('gulp');
var babel   = require('gulp-babel');
var uglify  = require('gulp-uglify');
var concat  = require('gulp-concat');
var header  = require('gulp-header');
var pkg     = require('./package.json');

/* Banner */
var banner = [

	'/*! ',
		'<%= pkg.title %> | ',
		'v<%= pkg.version %> | ',
		'<%= pkg.author %>',
	' */',
	'\n'

].join('');

/* Scripts */
gulp.task('app-js', function() {

  return gulp.src([
      './src/smoothy.js'
    ])
    .pipe(babel())
    .pipe(concat('smoothy.min.js'))
    .pipe(uglify())
    .pipe(header(banner, { pkg: pkg }))
    .pipe(gulp.dest('./dist'))

});

/* Run Gulp */
gulp.task('default', ['app-js']);
