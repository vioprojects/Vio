/// <reference path='../_refer.ts' />

module Vio.Controllers {
	'use strict';

	export interface IBodyControllerScope extends Vio.Scope.IVioScope {
	}

	export class BodyController {
		public static $inject = [
		];

		constructor(
		) {
			
		}
	}
}

angular.module('app.controllers').controller('BodyController', Vio.Controllers.BodyController);
