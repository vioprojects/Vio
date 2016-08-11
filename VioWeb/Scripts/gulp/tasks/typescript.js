var gulp = require('gulp');
var path = require('path');
var ts = require('gulp-typescript');
var karma = require('gulp-karma');
var config = require('../config');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var del = require('del');
var log = require('gulp-log2');
var async = require('async');
var _ = require('lodash');

var tsCommonConfig = {
	noImplicitAny: false,
	target: 'ES5'
}

// Export ts common settings
module.exports.tsCommonConfig = tsCommonConfig;

var tsProject = ts.createProject(_.assign({}, tsCommonConfig, {
	outDir: config.typescript.output.path
}));


gulp.task('build:ts', function (cb) {
	async.series([
		clean,
		compile.bind(null, config.typescript.src),
		concatJs,
	], cb);
})

gulp.task('watch:ts', function (cb) {
	var tsWatcher = gulp.watch(config.typescript.src, { interval: 500 });
	var concatJsWithMsg = concatJs.bind(null, function () {
		gutil.log('Finished', gutil.colors.cyan("'ts re-compile'"));
	});
	tsWatcher.on('change', function (event) {
		var srcPath = event.path;
		// changed or added 
		if (event.type === "changed" || event.type === "added") {
			compile(srcPath, concatJsWithMsg);
			// deleted
		} else if (event.type === "deleted") {
			var destPath = path.relative(config.typescript.base, srcPath);
			console.log('deleted: ', destPath);
			del(path.join(config.typescript.output.path, destPath).replace('.ts', '.js'), concatJsWithMsg);
		}
	});
	cb();
})

gulp.task('clean:ts', function (cb) {
	return clean(cb);
})

function compile(src, next) {
	gutil.log('ts compiling.. ' + src);
	return gulp.src(src, { base: config.typescript.base })
		.pipe(ts(tsProject))
		.pipe(log('ts compile finished'))
		.pipe(gulp.dest(config.typescript.output.path))
		.on('end', next ? next : gutil.noop);
}

function concatJs(next) {
	gutil.log('ts concatenating..');
	return gulp.src(config.javascript.src)
		.pipe(concat(config.javascript.output.filename))
		.pipe(log('ts concat finished'))
		.pipe(gulp.dest(config.javascript.output.path))
		.on('end', next ? next : gutil.noop);
}

function uglifyJs(next) {
	gutil.log('ts uglifying.. ');
	return gulp.src(path.join(config.javascript.output.path, config.javascript.output.filename))
		.pipe(uglify())
		.pipe(log('ts uglify finished'))
		.pipe(gulp.dest(config.javascript.output.path))
		.on('end', next ? next : gutil.noop);
}

function clean(next) {
	gutil.log('ts cleaning..');
	del([
		// output file
		path.join(config.javascript.output.path, config.javascript.output.filename),
		// tmp folder
		config.typescript.output.path
	], next ? next : gutil.noop)
}