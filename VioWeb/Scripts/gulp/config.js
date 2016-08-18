module.exports = {
	scss: {
		base: 'Scripts/content/styles',
		src: [
			'Scripts/content/styles/**/*.scss'
		],
		output: {
			path: 'dist/tmp/css',
			filename: 'all.css'
		}
	},
	css: {
		src: [
			'dist/tmp/css/**/*.css'
		],
		output: {
			path: 'dist',
			filename: 'all.min.css'
		}
	},
	typescript: {
		base: "Scripts/app",
		src: [
			"Scripts/app/**/*.ts"
		],
		output: {
			path: "dist/tmp/js"
		}
	},
	javascript: {
		src: [
			"dist/tmp/js/**/*.js"
		],
		output: {
			path: "dist",
			filename: "all.min.js"
		}
	},
	libraries: {
		// bower paths
		bowerDirectory: "bower_components/",
		bowerJson: "bower.json",
		output: {
				path: 'dist',
				filename: 'lib.min.js'
		}
	},
	assets: {
		srcDirectory: 'Scripts/content/',
		dist: '../content/'
	},
}