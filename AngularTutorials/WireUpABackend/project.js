/// <reference path="_all.ts"/>
var project;
(function (project) {
    "use strict";
    //create our angular module "project", and depend on the "mongolab" project
    angular.module("project", [
        "mongolab"
    ]).config(moduleConfig);
    function moduleConfig($roueProvider) {
        Logger.assert(false, "what's $routeProvider?  i can't find it in the docs for http://docs.angularjs.org/api/angular.Module");
    }
})(project || (project = {}));
//@ sourceMappingURL=project.js.map
