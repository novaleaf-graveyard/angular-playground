
/* manages the behavior of everything under the associated tag with the "ng-controller" attribute */

/// <reference path="../_all.ts"/>

/** namespace for all our app's code */
module todo {
	"use strict";

	export class TodoController {

		public temp;

		public injection(): any[] {
			return [
				'$scope',
				TodoController
			]
		}
		constructor(private $scope) {
			$scope.remaining = () => {
				return 3;
			};
			$scope.tempVal = "44";
		}


	}
	/** create the application */
	var todoMvcApp = angular.module(
		/** the name of this application, used in the view for ng-app */
		'todoMvcApp', [])
		/** specify the controller for the html-view, and set it up via IoC injection */
				.controller('todoController', TodoController.prototype.injection());
	//.directive('todoBlur', TodoBlur.prototype.injection())
	//.directive('todoFocus', TodoFocus.prototype.injection())
	//.service('todoStorage', TodoStorage.prototype.injection());
}





