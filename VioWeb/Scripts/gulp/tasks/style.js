var gulp = require('gulp');
var path = require('path');
var fs = require('fs');
var del = require('del');
var $ = require('gulp-load-plugins')();
var config = require('../config');
var util = require('../util');
var log = require('gulp-log2');
var async = require('async');

// neu gap loi phien ban thi copy thu muc win 32 vo http://stackoverflow.com/questions/31301582/task-runner-explorer-cant-load-tasks/31444245

gulp.task('build:scss', function (cb) {
	async.series([
		clean.bind(null, [
			// output file
			path.join(config.css.output.path, config.css.output.filename),
			// tmp folder
			config.scss.output.path
		]),
		compile.bind(null, config.scss.src),
		concat
	], cb);
});

gulp.task('watch:scss', function (cb) {
	gulp.watch(config.scss.src, { interval: 500 })
		.on('change', function (event) {
			var srcPath = event.path;
			// if partial file changed, re-compile all
			if (path.basename(srcPath).charAt(0) === '_') {
				$.util.log($.util.colors.green('partial file changed: ', path.basename(srcPath), ' re-compile all..'));
				async.series([
					compile.bind(null, config.scss.src),
					concat.bind(null, function () {
						$.util.log('Finished', $.util.colors.cyan("'scss re-compile'"));
					})
				]);

			} else {
				$.util.log($.util.colors.green('file ' + event.type + ': ', path.basename(srcPath)));
				// changed or added
				if (event.type === "changed" || event.type === "added") {
					async.series([
						compile.bind(null, srcPath),
						concat.bind(null, function () {
							$.util.log('Finished', $.util.colors.cyan("'scss re-compile'"));
						})
					], cb);
					// deleted
				} else if (event.type === "deleted") {
					var destPath = path.relative(config.scss.base, srcPath);
					async.series([
						clean.bind(null, path.join(config.scss.output.path, destPath).replace('.scss', '.css')),
						concat.bind(null, function () {
							$.util.log('Finished', $.util.colors.cyan("'scss re-compile'"));
						})
					], cb);
				}
			}
		});

	cb();
})

gulp.task('clean:scss', function (cb) {
	return clean([
		path.join(config.css.output.path, config.css.output.filename),
		config.scss.output.path
	], cb);
});

function compile(src, next) {
	$.util.log('scss compiling.. ' + src);
	return gulp.src(src, { base: config.scss.base })
		.pipe(util.processSass())
		.pipe(util.autoprefix())
		.pipe(util.resolveAssets())
		.pipe(log('scss compile finished: ', src))
		.pipe(gulp.dest(config.scss.output.path))
		.on('end', next ? next : $.util.noop);
}

function concat(next) {
	$.util.log('css concatenating..');
	return gulp.src(config.css.src)
		.pipe($.concat(config.css.output.filename))
		.pipe(log('css concat finished'))
		.pipe(gulp.dest(config.css.output.path))
		.on('end', next ? next : $.util.noop);
}

function optimize(next) {
	$.util.log('css optimizing..');
	return gulp.src(path.join(config.css.output.path, config.css.output.filename))
		.pipe(util.optimizeCss())
		.pipe(log('css optimize finished'))
		.pipe(gulp.dest(config.css.output.path))
		.on('end', next ? next : $.util.noop);
}

function clean(src, next) {
	$.util.log('scss cleaning.. ' + src);
	del(src, next ? next : $.util.noop)
}