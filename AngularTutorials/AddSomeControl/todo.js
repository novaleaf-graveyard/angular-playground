/* manages the behavior of everything under the associated tag with the "ng-controller" attribute */
/// <reference path="../_all.ts"/>
/** namespace for all our app's code */
var todo;
(function (todo) {
    "use strict";
    var TodoController = (function () {
        function TodoController($scope) {
            this.$scope = $scope;
            $scope.remaining = function () {
                return 3;
            };
            $scope.tempVal = "44";
        }
        TodoController.prototype.injection = function () {
            return [
                '$scope', 
                TodoController
            ];
        };
        return TodoController;
    })();
    todo.TodoController = TodoController;    
    /** create the application */
    var todoMvcApp = angular.module(/** the name of this application, used in the view for ng-app */
    'todoMvcApp', []).controller(/** specify the controller for the html-view, and set it up via IoC injection */
    'todoController', TodoController.prototype.injection());
    //.directive('todoBlur', TodoBlur.prototype.injection())
    //.directive('todoFocus', TodoFocus.prototype.injection())
    //.service('todoStorage', TodoStorage.prototype.injection());
    })(todo || (todo = {}));
//@ sourceMappingURL=todo.js.map
