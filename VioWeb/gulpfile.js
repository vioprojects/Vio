var Promise = require('es6-promise').Promise; //https://www.drupal.org/node/2695765
require('fs').readdirSync('./Scripts/gulp/tasks')
	.forEach(function (file) {
		require('./Scripts/gulp/tasks/' + file);
	});