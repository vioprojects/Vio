/// <reference path='../common/_refer.ts' />
'use strict';

angular.module('app').config(['$stateProvider', '$urlRouterProvider', ($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider) => {
    $stateProvider.state('body.home', <any>{
        url: "",
        controller: ['$state', ($state: angular.ui.IStateService) => {
			if ($state.is("body.home")) {
				$state.go("body.home.detail")
			}
		}],
        template: `<home-body></home-body>`,
    });
	$stateProvider.state('body.home.detail', <any>{
        url: "/home",
		titleKey: 'Home',
		caseInsensitiveMatch: false,
		template: `<home-detail-body></home-detail-body>`,
		reloadOnSearch: false
    });
}]);