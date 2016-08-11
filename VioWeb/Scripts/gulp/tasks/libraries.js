var gulp = require('gulp');
var path = require('path');
var del = require('del');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var filter = require('gulp-filter');
var add = require('gulp-add-src');
var gutil = require('gulp-util');
var mainBowerFiles = require('main-bower-files');
var config = require('../config');


gulp.task('build:libraries', function (cb) {
	gutil.log('libraries building..');
	return gulp
		.src(mainBowerFiles({
			paths: {
				bowerDirectory: config.libraries.bowerDirectory,
				bowerJson: config.libraries.bowerJson
			}
		}))
		.pipe(concat(config.libraries.output.filename, { newLine: ';\n' }))
		.pipe(gulp.dest(config.libraries.output.path));
})

gulp.task('clean:libraries', function (cb) {
	gutil.log('libraries cleaning..');
	return del(path.join(config.libraries.output.path, config.libraries.output.filename), cb);
})