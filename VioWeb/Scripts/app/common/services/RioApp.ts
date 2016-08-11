/// <reference path='../_refer.ts' />

module Vio.Services {
	'use strict';

	export class RioApp {
		public static $inject = [
			'$q',
			'$injector',
			'rioLangLoader'
		];
		private isInitialized: boolean;
		private promiseInitializing: angular.IPromise<any[]>;

		constructor(
			public $q: angular.IQService,
			public $injector: angular.auto.IInjectorService,
			public rioLangLoader: any
		) {
		}

		public initialize = () => {
			if (this.isInitialized) return;
			if (this.promiseInitializing) return this.promiseInitializing;
			let deffered = this.$q.defer();
			this.$q
				.all([
					this.rioLangLoader({}),
				])
				.then(() => {
					this.isInitialized = true;
					this.promiseInitializing = null;
					deffered.resolve();
				});
			this.promiseInitializing = deffered.promise;
			return deffered.promise;
		}
	}
	Vio.Services.addService("RioApp", RioApp);
}