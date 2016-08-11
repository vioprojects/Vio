/// <reference path='_refer.ts' />
module Vio.Directives {
	'use strict';
	angular.module('app.directives', []);

	export var addDirective = (className: string, directiveClass: angular.IDirective) => {
		var directiveName: string = className.replace(/^[A-Z]/g, function (val: string) {
			return val.toLowerCase();
		});
		angular.module('app.directives').directive(directiveName, ['$injector', ($injector) => {
			return $injector.instantiate(directiveClass);
		}]);
	};
}