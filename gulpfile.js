// --------------------------------------------------------
// Gulp setup
// --------------------------------------------------------

/* Load plugins */
var babel   = require('gulp-babel');
var concat  = require('gulp-concat');
var eslint 	= require('gulp-eslint');
var gulp    = require('gulp');
var header  = require('gulp-header');
var uglify  = require('gulp-uglify');
var pkg     = require('./package.json');

/* Banner */
var banner = [
	'/*! ',
	'<%= pkg.title %> | ',
	'v<%= pkg.version %> | ',
	'<%= pkg.author %> ',
	'*/',
	'\n'
].join('');

/* Lint JavaScript */
gulp.task('app-eslint', function() {

	return gulp.src([
			'./src/*.js'
		]).pipe(eslint({
		'rules':{
			'indent': [1, 'tab'],
			'quotes': [1, 'single'],
			'semi': [1, 'always']
		}
	}))
	.pipe(eslint.format())
	.pipe(eslint.failOnError());

});

/* JavaScript */
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
gulp.task('default', [
	'app-eslint',
	'app-js'
], function () {
  gulp.watch(['./src/*.js'], ['app-eslint', 'app-js']);
});
