/// <reference path="_all.ts"/>
var project;
(function (project) {
    "use strict";
    //export function IProjectScope_Extends($scope: ng.IScope):IProjectScope{
    //	var _this = <IProjectScope>$scope;
    //	return _this;
    //}
    //create our angular module "project", and depend on the "mongolab" project
    angular.module("project", [
        "mongolab"
    ]).config(moduleConfig);
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
            return angular.equals(self.original, $scope.project);
        };
        $scope.destroy = function () {
            self.original.destroy(function () {
                $location.path("/list");
            });
        };
        $scope.save = function () {
            $scope.project.update(function () {
                $location.path("/");
            });
        };
    }
})(project || (project = {}));
//@ sourceMappingURL=project.js.map
