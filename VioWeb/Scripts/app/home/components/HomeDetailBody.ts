/// <reference path='../../common/_refer.ts' />

module Vio.Components {
    'use strict';

	Vio.Components.addComponent("homeDetailBody", {
		template: `
<vio-page>
	<div name="page-header">
		<div class="home-content">
			This is header: {{ ::('APP.COMMON.MENU.HOME' | rioTranslate) }}
		</div>
	</div>
	<div name="page-content">
		<div>
			This is content
		</div>
	</div>
	<div name="page-footer">
		<div>
			This is footer
		</div>
	</div>
</vio-page>
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