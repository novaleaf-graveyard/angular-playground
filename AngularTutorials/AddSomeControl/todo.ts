
/* manages the behavior of everything under the associated tag with the "ng-controller" attribute */

/// <reference path="../_all.ts"/>



/** namespace for all our app's code */
module todoModule {
	"use strict";


	/** our controller, as a class instead of a simple method as shown in the tutorial 
	the pattern for this was taken from the angular+typescript todoMVC, the main changes are:
	1) inside a module (todoModule)
	2) use a class (TodoControllerClass)
	3) use an IoC injector to bind our view 
	*/
	export class TodoControllerClass {


		/** IoC injection for binding our controller to the view during application load 
		
		*/
		public injection(): any[] {
			return [
				'$scope',
				TodoControllerClass
			]
		}

		constructor(
/** the scope of this controller (bound to the view) */
			private $scope) {
			$scope.todos = this.todos;
			//need to use lambda's so the method's scope ("this") is inside this TodoControllerClass, not inside $scope
			$scope.addTodo = () => this.addTodo();
			$scope.todoText = "";
			$scope.remaining = () => this.remaining();
			$scope.archive = () => this.archive();
		}

		/** our working-storage of our todo list */
		private todos = [{ text: "learn angular", done: true }, { text: "build an angular app", done: false }]; //populate with initial (sample) values

		private addTodo() {
			this.$scope.todos.push({ text: this.$scope.todoText, done: false });
		}

		private remaining() {
			var count = 0;
			angular.forEach(this.$scope.todos, (todo) => {
				count += todo.done ? 0 : 1;
			});
			return count;
		}
		private archive() {
			var oldTodos = this.$scope.todos;
			this.$scope.todos = [];
			angular.forEach(oldTodos, (todo) => {
				if (!todo.done) {
					this.$scope.todos.push(todo);
				}
			});
		}



	}
	/** create the application, stored as a local variable for no real reason */
	var todoMvcApp = angular.module(
/** the name of this application, used in the view for ng-app */
		'todoMvcAppRoot', [])
/** specify the controller for the html-view, and set it up via IoC injection */
				.controller('todoControllerScope', TodoControllerClass.prototype.injection());
	//other directives can be added too, see http://docs.angularjs.org/api/angular.module
	//.directive('todoBlur', TodoBlur.prototype.injection())
	//.directive('todoFocus', TodoFocus.prototype.injection())
	//.service('todoStorage', TodoStorage.prototype.injection());
}





