/// <reference path='../../common/_refer.ts' />

module Vio.Components {
    'use strict';

	Vio.Components.addComponent("homeDetailBody", {
		template: `
<div class="home-content">
aaaaaaaaaaaaaaaaaaaaaaaaaaaa1: {{ $ctrl.testString }}
translate: {{ ::('APP.COMMON.MENU.HOME' | rioTranslate) }}
</div>
`		,
		bindings: {
		},
		controller: class {
			private testString: string;

			// Injection
			public static $inject = [
			];
			constructor(
			) { }
			/**
				* @ngdoc method
				* @name $onInit
				* @author dovandinh
				*/
			private $onInit = () => {
				this.testString = "111111111";
				console.log("home");
			}
		}
	});
}