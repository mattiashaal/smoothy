// --------------------------------------------------------
// Gulp setup
// --------------------------------------------------------

const babel = require('gulp-babel');
const concat = require('gulp-concat');
const eslint = require('gulp-eslint');
const gulp = require('gulp');
const header = require('gulp-header');
const uglify = require('gulp-uglify');
const pkg = require('./package.json');

// --------------------------------------------------------
// Add banner to file headers
// --------------------------------------------------------

const banner = [
	'/*! ',
	'<%= pkg.title %> | ',
	'v<%= pkg.version %> | ',
	'<%= pkg.author %> ',
	'*/',
	'\n'
].join('');

// --------------------------------------------------------
// Paths to project folders
// --------------------------------------------------------

const paths = {
  js: {
    input: './src/smoothy.js',
    output: './dist/'
  }
}

// --------------------------------------------------------
// Lint JS
// --------------------------------------------------------

gulp.task('lint:js', function() {
	return gulp.src(paths.js.input)
	.pipe(eslint({
		'rules':{
			'indent': [2, 2],
			'quotes': [1, 'single'],
			'semi': [1, 'always']
		}
	}))
	.pipe(eslint.format())
	.pipe(eslint.failOnError());
});

// --------------------------------------------------------
// Build JS
// --------------------------------------------------------

gulp.task('build:js', function() {
	return gulp.src(paths.js.input)
	.pipe(babel())
	.pipe(concat('smoothy.min.js'))
	.pipe(uglify())
	.pipe(header(banner, { pkg: pkg }))
	.pipe(gulp.dest(paths.js.output))
});

// --------------------------------------------------------
// Run Gulp
// --------------------------------------------------------

gulp.task('default', [
	'lint:js',
	'build:js'
], function () {
  gulp.watch([paths.js.input], ['lint:js', 'build:js']);
});
