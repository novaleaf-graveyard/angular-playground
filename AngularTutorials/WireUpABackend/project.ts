/// <reference path="_all.ts"/>

module project{
	"use strict";

	export interface IProjectScope extends ng.IScope{
		projects: ng.resource.IActionCall;
		save: () => void;
		project: mongolab.IMongoDbResource;
		isClean: () => bool;
		destroy:() => void;
	}
	//export function IProjectScope_Extends($scope: ng.IScope):IProjectScope{
	//	var _this = <IProjectScope>$scope;

		
	//	return _this;
	//}





	//create our angular module "project", and depend on the "mongolab" project
	angular.module("project", ["mongolab"])
		.config(moduleConfig)

		;
	/** dependency injection turns the specified parameters into named-parameters, so these services need to be created earlier, or be builtins */
	function moduleConfig($routeProvider:ng.IRouteProvider) {
		
		$routeProvider.when("/", { controller: ListCtrl, templateUrl: "list.html" })
		.when("/edit/:projectId", { controller: EditCtrl, templateUrl: "detail.html" })
		.when("/new", { controller: CreateCtrl, templateUrl: "detail.html" })
		.otherwise({ redirectTo: "/" });
		
	}

	function ListCtrl($scope, Project: mongolab.IMongoDbResourceClass) {
		
		$scope.projects = Project.query();		
	}

	function CreateCtrl($scope: IProjectScope, $location: ng.ILocationService, Project: mongolab.IMongoDbResourceClass){

		$scope.save = () => {
			//Logger.assert(false, "figure out what type .project is, so we can strongy type ._id");
			Project.save($scope.project, (project: mongolab.IMongoDbResource) => $location.path("/edit/" + project._id.$oid));
		}
	}
	function EditCtrl($scope: IProjectScope, $location: ng.ILocationService, $routeParams, Project: mongolab.IMongoDbResourceClass){
		var self = this;
		Project.get({ id: $routeParams.projectId },
			(project) => {
				self.original = project;
				$scope.project = new Project(self.original);
			});
		//determine if user modified the form, if so, we will use this info to enable the save button (usage of $scope.isClean in the detail.html template)
		$scope.isClean = () => { return angular.equals(self.original, $scope.project) };

		$scope.destroy = () => {
			self.original.destroy(() => { $location.path("/list") });
		};
		$scope.save = () => {
			$scope.project.update(() => { $location.path("/") });
		};
	}




	

}


