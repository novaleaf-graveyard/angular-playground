/// <reference path="_all.ts"/>
var angular;
(function (angular) {
    /** stub for creatting an IoC controller */
    var Controller = (function () {
        function Controller() { }
        return Controller;
    })();
    angular.Controller = Controller;    
})(angular || (angular = {}));
var project;
(function (project) {
    "use strict";
    //export function IProjectScope_Extends($scope: ng.IScope):IProjectScope{
    //	var _this = <IProjectScope>$scope;
    //	return _this;
    //}
    var ProjectController = (function () {
        function ProjectController(/** the scope of this controller (bound to the view)
        this is a ng.IScope
        */
        $ngScope) {
            //we extend the ngScope, cast it to ITodoScope, and return it
            this.$scope = $ngScope// ITodoScope_Extend($ngScope, this);
            ;
        }
        ProjectController.controllerConstructor = /** IoC injection for binding our controller to the view during application load.
        should have same number of arguments as our controller's constructor, plus the Type of our Controller
        */
        function controllerConstructor() {
            return [
                /** name of scope that our HTML injection {{$scope}} must refer to */
                '$scope', 
                /** type of our controller, so the IoC can construct it) */
                ProjectController
            ];
        };
        return ProjectController;
    })();
    project.ProjectController = ProjectController;    
    //create our angular module "jsProjectModule", and depend on the "mongolab" project
    angular.module("jsProjectModule", [
        "mongolabModule"
    ]).controller(/** specify the controller for the html-view, and set it up via IoC injection */
    "projectController", ProjectController.controllerConstructor()).config(moduleConfig);
    /** dependency injection turns the specified parameters into named-parameters, so these services need to be created earlier, or be builtins */
    function moduleConfig($routeProvider) {
        $routeProvider.when("/", {
            controller: ListCtrl,
            templateUrl: "list.html"
        }).when("/edit/:projectId", {
            controller: EditCtrl,
            templateUrl: "detail.html"
        }).when("/new", {
            controller: CreateCtrl,
            templateUrl: "detail.html"
        }).otherwise({
            redirectTo: "/"
        });
    }
    function ListCtrl($scope, Project) {
        $scope.projects = Project.query();
    }
    function CreateCtrl($scope, $location, Project) {
        $scope.save = function () {
            //Logger.assert(false, "figure out what type .project is, so we can strongy type ._id");
            Project.save($scope.project, function (project) {
                return $location.path("/edit/" + project._id.$oid);
            });
        };
    }
    function EditCtrl($scope, $location, $routeParams, Project) {
        var self = this;
        Project.get({
            id: $routeParams.projectId
        }, function (project) {
            self.original = project;
            $scope.project = new Project(self.original);
        });
        //determine if user modified the form, if so, we will use this info to enable the save button (usage of $scope.isClean in the detail.html template)
        $scope.isClean = function () {
            //Logger.inspect(false);
            return angular.equals(self.original, $scope.project);
        };
        $scope.destroy = function () {
            self.original.destroy(function () {
                $location.path("/list");
            });
        };
        $scope.save = function () {
            Logger.inspect(false);
            $scope.project.update(function () {
                $location.path("/");
            });
        };
    }
})(project || (project = {}));
//@ sourceMappingURL=project.js.map
