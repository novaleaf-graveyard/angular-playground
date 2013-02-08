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
        function TodoControllerClass($scope) {
            this.$scope = $scope;
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
            $scope.tempVal = "hello";
            $scope.addTodo = function () {
                $scope.todos.push({
                    text: $scope.todoText,
                    done: false
                });
                $scope.todoText = "";
            };
        }
        TodoControllerClass.prototype.injection = //populate with initial (sample) values
        /** IoC injection for binding our controller to the view during application load
        
        */
        function () {
            return [
                '$scope', 
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
