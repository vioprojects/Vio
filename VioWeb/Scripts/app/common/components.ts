/// <reference path='_refer.ts' />

module Vio.Components {
	'use strict';
	angular.module('app.components', []);

	export var addComponent = (className: string, componentClass: angular.IComponentOptions) => {
		var componentName: string = className.replace(/^[A-Z]/g, (val: string) => val.toLowerCase());
		angular.module('app.components').component(componentName, componentClass);
	};
}