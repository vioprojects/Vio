var path = require('path');
var lazypipe = require('lazypipe');
var _ = require('lodash');
var $ = require('gulp-load-plugins')();
var autoprefixer = require('gulp-autoprefixer');
var assets = require('postcss-assets');
var mqpacker = require('css-mqpacker');
var cssnano = require('cssnano');
var config = require('./config');

// Sass process task
// **Be careful! Tasks streamed by lazypipe() cannot take arguments.
// Instead, set as second args of pipe() or use function.**
var processSass = lazypipe()
	.pipe(function () {
		return $.sass({
		}).on('error', $.sass.logError);
	});

var autoprefix = function (opts) {
	// _.assign nearly equals to $.extend
	var opts = _.assign({
		browsers: [
			'last 2 Chrome versions',
			'ie >= 10',
			'last 2 Safari versions',
			'iOS >= 7',
			'Android >= 4'
		]
	}, opts);
	return autoprefixer(opts);
}

var resolveAssets = function (opts) {
	var opts = _.assign({
		loadPaths: ['fonts/', 'images/'],
		basePath: './Script/content/',
		baseUrl: config.assets.dist
	}, opts);
	return $.postcss([assets(opts)]);
}

// CSS optimization bia `mqpacker`, `cssnano`
var optimizeCss = lazypipe()
	.pipe(function () {
		var processors = [
			mqpacker({ sort: true }),
			cssnano({
				zindex: false, // If on, it causes problem when you deal z-index among files
			})
		];
		return $.postcss(processors);
	});

module.exports = {
	processSass: processSass,
	autoprefix: autoprefix,
	resolveAssets: resolveAssets,
	optimizeCss: optimizeCss
}
