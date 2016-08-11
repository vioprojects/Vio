/// <reference path='../../common/_refer.ts' />

module Vio.Components {
	'use strict';

	Vio.Components.addComponent("HomeBody", {
		template: `
<div>
	<div ui-view></div>
</dive>
		`,
		controller: class implements angular.IComponentController {
			public static $inject = [
				'$scope',
				'$state'
			];
			constructor(
				private $scope: angular.IScope,
				private $state: angular.ui.IStateService
			) {
				$scope['$state'] = $state;
			}

			public $onInit = () => {
				console.log("home body");
			}

			public $onDestroy: () => {
			}
		}
	});
}
