/// <reference path='../_refer.ts' />

module Vio.Filters {
	'use strict';

	export interface IFilterRioTranslate {
		(translationId: string, interpolateParams?: any, interpolation?: any): string;
	}

	export function RioTranslate($parse: angular.IParseService, $translate: angular.translate.ITranslateService) {
		var translateCaches = {};
		return <IFilterRioTranslate>function (translationId, interpolateParams, interpolation) {

			if (!interpolateParams) {
				if (hasCache(translationId)) {
					return translateCaches[translationId];
				}
				return (translateCaches[translationId] = $translate.instant(translationId, interpolateParams, interpolation));
			}

			if (!angular.isObject(interpolateParams)) {
				interpolateParams = $parse(interpolateParams)(this);
			}

			var cacheKey = translationId + "___" + JSON.stringify(interpolateParams);
			if (typeof translateCaches[cacheKey] != "undefined") {
				return translateCaches[cacheKey];
			}
			return (translateCaches[cacheKey] = $translate.instant(translationId, interpolateParams, interpolation));
		};

		function hasCache(key: string) {
			return typeof translateCaches[key] != "undefined";
		}
	}
	RioTranslate.$inject = ['$parse', '$translate'];
	angular.module('app.filters').filter("rioTranslate", Vio.Filters.RioTranslate);
}
