/// <reference path='_refer.ts' />

module Vio.Services {
	'use strict';
	angular.module('app.services', ['ngResource']);

	export var addService = (className: string, serviceClass: any) => {
		var serviceName: string = className.replace(/^[A-Z]/g, function (val: string) {
			return val.toLowerCase();
		});

		angular.module('app.services').factory(serviceName, ['$injector', ($injector) => {
			return $injector.instantiate(serviceClass);
		}]);
	};
}