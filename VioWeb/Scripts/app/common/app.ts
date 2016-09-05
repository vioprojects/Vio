/// <reference path='_refer.ts' />

'use strict';

var app = angular.module('app', [
	'app.controllers',
	'app.directives',
	'app.components',
	'app.services',
	'app.filters',
	'ui.router',
	'app.i18n',
	'pascalprecht.translate',
	'multi-transclude'
]);

app.config(['$compileProvider', '$locationProvider', ($compileProvider: angular.ICompileProvider, $locationProvider: angular.ILocationProvider) => {
	$compileProvider.debugInfoEnabled(true);
	$locationProvider.html5Mode(true);
}]);