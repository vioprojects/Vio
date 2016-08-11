/// <reference path='../_refer.ts' />

'use strict';

angular.module('app').config([
    '$stateProvider',
    '$urlRouterProvider',
    (
        $stateProvider: angular.ui.IStateProvider,
        $urlRouterProvider: angular.ui.IUrlRouterProvider
    ) => {
		$stateProvider.state('body', <any>{
			url: "",
			template: `
			<div class="global_main-c">
				<div id="ui-view" ui-view></div>
			</div>
		`,
			caseInsensitiveMatch: true,
			controller: 'BodyController',
			resolve: { // Khoi tao cac gia tri truoc khi hien thi trang web
				"initialize": ["rioApp", (rioApp: Vio.Services.RioApp) => {
					return rioApp.initialize()
				}],
			}
		})

		$urlRouterProvider.otherwise(($injector: angular.auto.IInjectorService) => {
			$injector.invoke(['$state', ($state: angular.ui.IStateService) => {
				//$state.go('body.home');
			}]);
		});
	}]);
