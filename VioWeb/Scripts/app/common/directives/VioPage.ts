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
		<!-- Page Header -->
	</div>

	<div class="page-content" ng-multi-transclude="page-content">
		<!-- Page Content -->
	</div>

	<div class="page-footer" ng-multi-transclude="page-footer">
		<!-- Page Footer -->
	</div>
</div>
		`;
	}

	Vio.Directives.addDirective("VioPage", VioPage);
}
