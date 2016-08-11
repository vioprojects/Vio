/// <reference path='_refer.ts' />

'use strict';

// http://stackoverflow.com/questions/20540877/correct-use-for-angular-translate-in-controllers
// http://jsfiddle.net/PascalPrecht/eUGWJ/7/
// https://github.com/angular-translate/angular-translate
angular.module('app.i18n', ['pascalprecht.translate', 'app.services'])
	.config(["$provide", function ($provide) {
		$provide.constant();
	}])
	.config(['$translateProvider', function ($translateProvider: angular.translate.ITranslateProvider) {
		$translateProvider.useSanitizeValueStrategy('escaped');
		var lang = "vi-vn";//((<string>$.cookie("lang")) || "vi-vn").toLowerCase();
		$translateProvider.useLoader("rioLangLoader", {});
		//$translateProvider.use(lang);
		$translateProvider.preferredLanguage(lang);
		$translateProvider.fallbackLanguage(lang);
	}]);

angular.module('app.i18n').factory("rioLangLoader", ['$http', '$q', function (
	$http: angular.IHttpService,
	$q: angular.IQService
) {
	var promise: angular.IPromise<any>
	return function (options) {
		if (promise) return promise;
		var deferred = $q.defer();
		promise = deferred.promise;
		$http({
			method: 'GET',
			url: `Scripts/content/resources/lang.${options['key']}.json`
		}).success((data: Object) => {
			deferred.resolve(data);
			promise = null;
		}).error(() => {
			deferred.reject();
			promise = null;
		});
		return promise;
	};
}]);