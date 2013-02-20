/// <reference path="_all.ts"/>


module angular{

	/** stub for creatting an IoC controller */
	export class Controller{

		

	}

	export interface IController{
		/** IoC injection for binding our controller to the view during application load.  
        should have same number of arguments as our controller's constructor, plus the Type of our Controller		
		*/
		injection(): any[];
	}
}
module ng{

}

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


	export class ProjectController{
		/** IoC injection for binding our controller to the view during application load.  
        should have same number of arguments as our controller's constructor, plus the Type of our Controller		
		*/
		public static controllerConstructor():any[]{
			return [
				/** name of scope that our HTML injection {{$scope}} must refer to */
				'$scope',
				/** type of our controller, so the IoC can construct it) */
				ProjectController
			]
		}
		constructor(
			/** the scope of this controller (bound to the view) 
            this is a ng.IScope
            */
			$ngScope: ng.IScope) {
			//we extend the ngScope, cast it to ITodoScope, and return it
			this.$scope = <IProjectScope>$ngScope;  // ITodoScope_Extend($ngScope, this);
		}
		public $scope: IProjectScope;
	}
	

	//create our angular module "jsProjectModule", and depend on the "mongolab" project
	angular.module("jsProjectModule", ["mongolabModule"])
		/** specify the controller for the html-view, and set it up via IoC injection */
		.controller("projectController",ProjectController.controllerConstructor())
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
		$scope.isClean = () => {
			//Logger.inspect(false);
			return angular.equals(self.original, $scope.project)
		};

		$scope.destroy = () => {
			self.original.destroy(() => { $location.path("/list") });
		};
		$scope.save = () => {

			Logger.inspect(false);
			$scope.project.update(() => { $location.path("/") });
		};
	}




	

}


