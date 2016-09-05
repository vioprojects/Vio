/*
Copyright (C) 2014 Zach Snow (http://zachsnow.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
(function () {
	var module = angular.module('multi-transclude', []);

	var Ctrl = ['$scope', '$attrs', '$element', '$transclude', function ($scope, $attrs, $element, $transclude) {
		// Ensure we're transcluding or nothing will work.
		if (!$transclude) {
			throw new Error(
			  'Illegal use of ngMultiTransclude controller. No directive ' +
			  'that requires a transclusion found.'
			);
		}

		// There's not a good way to ask Angular to give you the closest
		// controller from a list of controllers, we get all multi-transclude
		// controllers and select the one that is the child of the other.
		this.$element = $element;
		this.isChildOf = function (otherCtrl) {
			return otherCtrl.$element[0].contains(this.$element[0]);
		};

		// Destination for transcluded content.
		var toTransclude;
		$scope.$on('$destroy', function () {
			if (toTransclude) {
				toTransclude.remove();
				toTransclude = null;
			}
		});

		// A temporary container for transcluded content, so that content will not
		// be detached from the DOM during link. This ensures that controllers and
		// other data parent nodes are accessible within the transcluded content.
		var transcludeContainer = angular.element('<div style="display:none;"></div>');

		// Transclude content that matches name into element.
		this.transclude = function (name, element) {
			for (var i = 0; i < toTransclude.length; ++i) {
				// Uses the argument as the `name` attribute directly, but we could
				// evaluate it or interpolate it or whatever.
				var el = angular.element(toTransclude[i]);
				if (el.attr('name') === name) {
					element.empty();
					element.append(el);
					return;
				}
			}
		};

		// Should be called after all transclusions are complete to clean up the
		// temporary container.
		this.transcluded = function () {
			if (transcludeContainer) {
				transcludeContainer.remove();
				transcludeContainer = null;
			}
		};

		// Transclude content and keep track of it; be sure to keep it in the DOM
		// by attaching it to `$element`.
		transcludeProc = function (clone) {
			toTransclude = clone;

			transcludeContainer.append(clone);
			$element.append(transcludeContainer);
		};

		// 'sibling'      - The transcluded contents scope is a sibling one to the element where transclusion happens. That's the current ng-transclude behaviour.
		// 'parent'       - The transcluded contents scope is that of the element where transclusion happens.
		// 'grandparent'  - parent of 'parent' scope (It used for isolated scope directive)
		// 'child'        - The transcluded contents scope is child scope to the scope of the element where transclusion happens.
		var scopeType = $attrs['ngMultiTranscludeController'] || 'sibling';
		switch (scopeType) {
			case 'sibling':
				$transclude(transcludeProc);
				break;
			case 'parent':
				$transclude($scope, transcludeProc);
				break;
			case 'grandparent':
				$transclude($scope.$parent, transcludeProc);
				break;
			case 'child':
				$transclude($scope.$new(), transcludeProc);
				break;
		}
	}];

	module.directive('ngMultiTemplate', function () {
		return {
			transclude: true,
			templateUrl: function (element, attrs) {
				return attrs.ngMultiTemplate;
			},
			controller: Ctrl,
			link: function (scope, element, attrs, ctrl) {
				ctrl.transcluded();
			}
		};
	});

	module.directive('ngMultiTranscludeController', function () {
		return {
			controller: Ctrl,
			link: function (scope, element, attrs, ctrl) {
				ctrl.transcluded();
			}
		};
	});

	module.directive('ngMultiTransclude', function () {
		return {
			require: ['?^ngMultiTranscludeController', '?^ngMultiTemplate'],
			link: function (scope, element, attrs, ctrls) {
				// Find the deepest controller (closes to this element).
				var ctrl1 = ctrls[0];
				var ctrl2 = ctrls[1];
				var ctrl;
				if (ctrl1 && ctrl2) {
					ctrl = ctrl1.isChildOf(ctrl2) ? ctrl1 : ctrl2;
				}
				else {
					ctrl = ctrl1 || ctrl2;
				}

				// A multi-transclude parent directive must be present.
				if (!ctrl) {
					throw new Error('Illegal use of ngMultiTransclude. No wrapping controller.')
				}

				// Receive transcluded content.
				ctrl.transclude(attrs.ngMultiTransclude, element);
			}
		};
	});
})();