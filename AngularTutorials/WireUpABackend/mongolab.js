/// <reference path="_all.ts"/>
var mongolab;
(function (mongolab) {
    //cloud persistance
    angular.module("mongolab", [
        "ngResource"
    ]).factory("Project", mongoDbResourceFactory);
    function mongoDbResourceFactory($resource) {
        //ngResource definition of an action descriptor, will inject this into our Project class below
        var updateDescriptor = {
            method: "PUT"
        };
        //create the "Project" class (resource class)
        var Project = $resource("https://api.mongolab.com/api/1/databases" + "/angularjs/collections/projects/:id", {
            apiKey: '4f847ad3e4b08a2eed5f3b54'
        }, {
            update: updateDescriptor
        });
        //injects our update as an "action descriptor"
        //looks to be a facade, invoking the singleton instance of ProjectClass
        //provide implemention of the update method
        Project.prototype.update = function (cb) {
            Logger.assert(false, "jason, figure out type of 'this', so we can maybe strongly type it");
            //not sure what "this" is or where the value of _id is comming from
            return Project.update({
                id: this._id.$oid
            }, angular.extend({
            }, this, {
                _id: undefined
            }), cb);
        };
        //provide implemention of the destroy method
        Project.prototype.destroy = function (cb) {
            return Project.remove({
                id: this._id.$oid
            }, cb);
        };
        return Project;
    }
})(mongolab || (mongolab = {}));
//@ sourceMappingURL=mongolab.js.map
