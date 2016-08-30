/// <reference path="../_refer.ts" />

module Vio.Directives {
	'use strict';

	export interface IVioPageScope extends angular.IScope {
	}

	export class VioPage implements angular.IDirective {
		public static $inject = [
		];
		constructor(
		) {
		}
		public restrict = 'EA';
		public transclude = true;
		public replace = true;
		public scope = false;
		public template = `
<div class="page-c" ng-multi-transclude-controller="parent">
	<div class="page-header" ng-multi-transclude="page-header">
		<!-- Page Main -->
	</div>

	<div class="page-main" ng-multi-transclude="page-main">
		<!-- Page Main -->
	</div>

	<div class="page-footer" ng-multi-transclude="page-footer">
		<!-- Page Overall -->
	</div>
</div>
		`;
	}

	Vio.Directives.addDirective("VioPage", VioPage);
}
