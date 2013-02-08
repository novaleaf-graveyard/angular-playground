/* manages the behavior of everything under the associated tag with the "ng-controller" attribute */
/// <reference path="../_all.ts"/>
/** namespace for all our app's code */
var todoModule;
(function (todoModule) {
    "use strict";
    /** our controller, as a class instead of a simple method as shown in the tutorial
    the pattern for this was taken from the angular+typescript todoMVC, the main changes are:
    1) inside a module (todoModule)
    2) use a class (TodoControllerClass)
    3) use an IoC injector to bind our view
    */
    var TodoControllerClass = (function () {
        function TodoControllerClass(/** the scope of this controller (bound to the view) */
        $scope) {
            this.$scope = $scope;
            var _this = this;
            /** our working-storage of our todo list */
            this.todos = [
                {
                    text: "learn angular",
                    done: true
                }, 
                {
                    text: "build an angular app",
                    done: false
                }
            ];
            $scope.todos = this.todos;
            //need to use lambda's so the method's scope ("this") is inside this TodoControllerClass, not inside $scope
            $scope.addTodo = function () {
                return _this.addTodo();
            };
            $scope.todoText = "";
            $scope.remaining = function () {
                return _this.remaining();
            };
            $scope.archive = function () {
                return _this.archive();
            };
        }
        TodoControllerClass.prototype.injection = /** IoC injection for binding our controller to the view during application load
        
        */
        function () {
            return [
                '$scope', 
                TodoControllerClass
            ];
        };
        TodoControllerClass.prototype.addTodo = //populate with initial (sample) values
        function () {
            this.$scope.todos.push({
                text: this.$scope.todoText,
                done: false
            });
        };
        TodoControllerClass.prototype.remaining = function () {
            var count = 0;
            angular.forEach(this.$scope.todos, function (todo) {
                count += todo.done ? 0 : 1;
            });
            return count;
        };
        TodoControllerClass.prototype.archive = function () {
            var _this = this;
            var oldTodos = this.$scope.todos;
            this.$scope.todos = [];
            angular.forEach(oldTodos, function (todo) {
                if(!todo.done) {
                    _this.$scope.todos.push(todo);
                }
            });
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
