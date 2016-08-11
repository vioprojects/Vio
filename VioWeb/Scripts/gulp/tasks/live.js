var gulp = require('gulp');
var runSequence = require('run-sequence');
var async = require('async');
var gutil = require('gulp-util');

gulp.task('_live', function (cb) {
	runSequence('_build', 'watch', cb);
});

gulp.task('_build', function (cb) {
	async.series([
		function (next) {
			runSequence('build:libraries', 'build:ts', next);
		},
		logger('Build completed', 'yellow')
	], cb);
})
gulp.task('watch', ['watch:ts'], logger('Watch started', 'yellow'));
gulp.task('_clean', ['clean:libraries', 'clean:ts'], logger('Clean completed', 'white'));

function logger(msg, color) {
	return function (next) {
		gutil.log(
			gutil.colors[color ? color : 'gray'](msg)
		);
		if (next) next();
	}
}