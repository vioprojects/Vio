require('fs').readdirSync('./Scripts/gulp/tasks')
	.forEach(function (file) {
		require('./Scripts/gulp/tasks/' + file);
	});