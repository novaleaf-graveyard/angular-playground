/// <reference path="_all.ts"/>
/** @define {boolean} */
var DEBUG_MODE = true;
var debug;
if(DEBUG_MODE) {
    /** @param {...} args */
    debug = function (args) {
        console.log.apply(console, arguments);
    };
} else {
    /** @param {...} args */
    debug = function (args) {
    };
}
var mongolab;
(function (mongolab) {
    //cloud persistance
    angular.module("mongolab", [
        "ngResource"
    ]).factory("Project", storageServiceFactory);
    function storageServiceFactory($resource) {
        //ngResource definition of an action descriptor, will inject this into our Project class below
        var updateDescriptor = {
            method: "PUT"
        };
        var Project = $resource("https://api.mongolab.com/api/1/databases" + "/angularjs/collections/projects/:id", {
            apiKey: '4f847ad3e4b08a2eed5f3b54'
        }, {
            update: updateDescriptor
        });
        //injects our update as an "action descriptor"
        //looks to be a facade, invoking the singleton instance of ProjectClass
        Project.prototype.update = function (cb) {
            debugger;

            //not sure what "this" is or where the value of _id is comming from
            return Project.update({
                id: this._id.$oid
            }, angular.extend({
            }, this, {
                _id: undefined
            }), cb);
        };
        Project.prototype.destroy = function (cb) {
            return Project.remove({
                id: this._id.$oid
            }, cb);
        };
        return Project;
    }
})(mongolab || (mongolab = {}));
//@ sourceMappingURL=mongolab.js.map
