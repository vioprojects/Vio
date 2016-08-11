var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var config = require('../config');
var log = require('gulp-log2');
var gutil = require('gulp-util');

// Concatenate & Minify JS
gulp.task('scripts', function () {
	gutil.log('scripts compile ...');
	gutil.log(config.javascript.src);
	return gulp.src(config.javascript.src)
		.pipe(concat(config.javascript.output.filename))
		.pipe(log('scripts concat finished'))
		.pipe(gulp.dest(config.javascript.output.path));
});