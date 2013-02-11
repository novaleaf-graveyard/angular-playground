/* manages the behavior of everything under the associated tag with the "ng-controller" attribute */
/// <reference path="../_all.ts"/>
/** namespace for all our app's code */
var todoModule;
(function (todoModule) {
    "use strict";
    var TodoItem = (function () {
        function TodoItem(text, done) {
            this.text = text;
            this.done = done;
        }
        return TodoItem;
    })();
    todoModule.TodoItem = TodoItem;    
    /**
    extend an instance of ng.IScope with our variables/functions needed for ITodoScope
    this method acts as a psudo-constructor, adding the needed initialization logic to make this extending of the base class occur
    @returns the input scope, cast to our ITodoScope type
    */
    function ITodoScope_Extend($scope, controller) {
        //cast the input scope to our extended type, so we can (type)safely add our extended functionality
        var _this = $scope;
        //construct our extended functionality
         {
            _this.todos = [
                {
                    text: "learn angular",
                    done: true
                }, 
                {
                    text: "build an angular app",
                    done: true
                }, 
                {
                    text: "convert todo code to Typescript!",
                    done: false
                }
            ]//populate with initial (sample) values
            ;
            _this.todoText = "";
            _this.addTodo = function () {
                _this.todos.push({
                    text: _this.todoText,
                    done: false
                });
            };
            _this.remaining = function () {
                var count = 0;
                angular.forEach(_this.todos, function (todo) {
                    count += todo.done ? 0 : 1;
                });
                return count;
            };
            _this.archive = function () {
                var oldTodos = _this.todos;
                _this.todos = [];
                angular.forEach(oldTodos, function (todo) {
                    if(!todo.done) {
                        _this.todos.push(todo);
                    }
                });
            };
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
    var TodoControllerClass = (function () {
        function TodoControllerClass(/** the scope of this controller (bound to the view)
        this is a ng.IScope
        */
        $ngScope) {
            //we extend the ngScope, cast it to ITodoScope, and return it
            this.$scope = ITodoScope_Extend($ngScope, this);
        }
        TodoControllerClass.prototype.injection = /** IoC injection for binding our controller to the view during application load.
        should have same number of arguments as our controller's constructor, plus the Type of our Controller
        */
        function () {
            return [
                /** name of scope that our HTML injection {{$scope}} must refer to */
                '$scope', 
                /** type of our controller, so the IoC can construct it) */
                TodoControllerClass
            ];
        };
        return TodoControllerClass;
    })();
    todoModule.TodoControllerClass = TodoControllerClass;    
    /** create the application, stored as a local variable for no real reason */
    var todoMvcApp = angular.module(/** the name of this application, used in the view for ng-app */
    'todoMvcAppRoot', []).controller(/** specify the controller for the html-view, and set it up via IoC injection */
    'todoControllerScope', TodoControllerClass.prototype.injection());
    //other directives can be added too, see http://docs.angularjs.org/api/angular.module
    //.directive('todoBlur', TodoBlur.prototype.injection())
    //.directive('todoFocus', TodoFocus.prototype.injection())
    //.service('todoStorage', TodoStorage.prototype.injection());
    })(todoModule || (todoModule = {}));
//@ sourceMappingURL=todo.js.map
