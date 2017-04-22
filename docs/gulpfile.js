// --------------------------------------------------------
// Gulp setup
// --------------------------------------------------------

/* Load plugins */
var babel 	= require('gulp-babel');
var concat  = require('gulp-concat');
var eslint 	= require('gulp-eslint');
var gulp    = require('gulp');
var header  = require('gulp-header');
var htmlmin = require('gulp-htmlmin');
var pkg 		= require('./package.json');
var postcss = require('gulp-postcss');
var prefix  = require('autoprefixer');
var rename  = require('gulp-rename');
var sass    = require('gulp-sass');
var sync    = require('browser-sync');
var uglify  = require('gulp-uglify');
var reload  = sync.reload;

/* Banner */
var banner = [
	'/*! ',
	'<%= pkg.title %> | ',
	'v<%= pkg.version %> | ',
	'<%= pkg.author %> ',
	'*/',
	'\n'
].join('');

/* Minify HTML */
gulp.task('app-html', function() {

	return gulp.src('./src/*.html')
		.pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
		.pipe(gulp.dest('./'))

})

/* CSS */
gulp.task('app-css', function() {

	return gulp.src('./assets/css/src/app.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(header(banner, { pkg: pkg }))
		.pipe(gulp.dest('./assets/css/dist'))
		.pipe(rename('app.min.css'))
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(postcss([ prefix({ browsers: ['last 2 versions'] }) ]))
		.pipe(gulp.dest('./assets/css/dist'))
		.pipe(sync.reload({ stream: true }));

});

/* Lint JavaScript */
gulp.task('app-eslint', function() {

	return gulp.src([
			'./assets/js/src/*.js'
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
			'./assets/js/src/panache.min.js',
			'./assets/js/src/smoothy.min.js',
			'./assets/js/src/app.js'
		])
		.pipe(concat('app.js'))
		.pipe(header(banner, { pkg: pkg }))
		.pipe(babel())
		.pipe(gulp.dest('./assets/js/dist'))
		.pipe(rename('app.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./assets/js/dist'))
		.pipe(sync.reload({ stream: true }));

});

/* Sync */
gulp.task('sync', function() {

	sync.init([
			'./assets/js/dist/*.js',
			'./assets/css/dist/*.css',
			'./src/*.html'
		], {
		proxy: 'smoothy.dev',
		browser: "google chrome",
		port: 7060,
		notify: true,
		xip: true
	});

});

gulp.task('sync-reload', function() {
	sync.reload();
});

/* Run Gulp */
gulp.task('default', [
		'app-css',
		'app-eslint',
		'app-js',
		'app-html',
		'sync'
	], function () {
	gulp.watch(['./assets/css/src/**/*.scss'], ['app-css'], ['sync-reload']);
	gulp.watch(['./assets/js/src/**/*.js'], ['app-eslint', 'app-js'], ['sync-reload']);
	gulp.watch(['./src/*.html'], ['app-html'], ['sync-reload']);
});
