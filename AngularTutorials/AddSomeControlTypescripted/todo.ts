
/* manages the behavior of everything under the associated tag with the "ng-controller" attribute */

/// <reference path="../_all.ts"/>



/** namespace for all our app's code */
module todoModule {
    "use strict";

    export interface ITodoItem {
        text: string;
        done: bool;
    }
    export class TodoItem implements ITodoItem {
        constructor(public text: string, public done: bool) { }
    }

    export interface ITodoScope extends ng.IScope {
        todos: ITodoItem[];
        addTodo(): void;
        todoText: string;
        remaining(): number;
        archive(): void;
        controller: TodoControllerClass;
    }
    /** 
    extend an instance of ng.IScope with our variables/functions needed for ITodoScope
    this method acts as a psudo-constructor, adding the needed initialization logic to make this extending of the base class occur 
    @returns the input scope, cast to our ITodoScope type
    */
    function ITodoScope_Extend($scope: ng.IScope, controller: TodoControllerClass): ITodoScope {
        //cast the input scope to our extended type, so we can (type)safely add our extended functionality
        var _this = <ITodoScope>$scope;

        //construct our extended functionality
        {
            _this.todos = [{ text: "learn angular", done: true }, { text: "build an angular app", done: true }, { text: "convert todo code to Typescript!", done: false }]; //populate with initial (sample) values
            _this.todoText = "";

            _this.addTodo = () => {
                _this.todos.push({ text: _this.todoText, done: false });
            };

            _this.remaining = () => {
                var count = 0;
                angular.forEach(_this.todos, (todo) => {
                    count += todo.done ? 0 : 1;
                });
                return count;
            }
            _this.archive = () => {
                var oldTodos = _this.todos;
                _this.todos = [];
                angular.forEach(oldTodos, (todo) => {
                    if (!todo.done) {
                        _this.todos.push(todo);
                    }
                });
            }
        }
        //add a reference back to the controller (parent), just in case it's ever needed
        _this.controller = controller;
        return _this;
    }



    /** our caller, as a class instead of a simple method as shown in the tutorial 
	the pattern for this was taken from the angular+typescript todoMVC, the main changes are:
	1) inside a module (todoModule)
	2) use a class (TodoControllerClass)
	3) use an IoC injector to bind our view 
	*/
    export class TodoControllerClass {


        /** IoC injection for binding our controller to the view during application load.  
        should have same number of arguments as our controller's constructor, plus the Type of our Controller		
		*/
        public injection(): any[] {
            return [
                /** name of scope that our HTML injection {{$scope}} must refer to */
                '$scope',
                /** type of our controller, so the IoC can construct it) */
				TodoControllerClass
            ]
        }

        constructor(
            /** the scope of this controller (bound to the view) 
            this is a ng.IScope
            */
            $ngScope: ng.IScope) {
            //we extend the ngScope, cast it to ITodoScope, and return it
            this.$scope = ITodoScope_Extend($ngScope, this);
        }
        public $scope: ITodoScope;


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





