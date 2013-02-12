/// <reference path="_all.ts"/>

/** @define {boolean} */
var DEBUG_MODE = true;

var debug;
if (DEBUG_MODE) {
	/** @param {...} args */
	debug = function (args) { console.log.apply(console, arguments); }
} else {
	/** @param {...} args */
	debug = function (args) { }
}

module mongolab {



	/** definition of our custom Resource Class */
	export interface IMongoDbResourceClass extends ng.resource.IResourceClass {

		/** reference to our prototype (used to create instances of IMongoDbResource), 
		which we can add additional functionality on to */
		prototype: IMongoDbResource;

		/** seems like we must inject this via the call to $resource(),  in the prototype this is mapped to $update */
		update: ng.resource.IActionCall;
	}
	/** instances of our custom Resource Class will implement this interface,
	from my (C#) perspective, this appears to be a facade into the "real" functionality, which lives in a single instance of IMongoDbResourceClass
	see our injection of ProjectClass.prototype.update to see what i mean... */
	export interface IMongoDbResource extends ng.resource.IResource {
		$update: ng.resource.IActionCall;
		/** injected via our call to IMongoDbResourceClass.prototype */
		update(cb): void;
		/** injected via our call to IMongoDbResourceClass.prototype */
		destroy(cb): void;
	}


	//cloud persistance
	angular.module("mongolab", ["ngResource"])
	.factory("Project", storageServiceFactory);

	function storageServiceFactory($resource: ng.resource.IResourceService) {

		var updateDescriptor: ng.resource.IActionDescriptor = { method: "PUT" };


		var Project = <IMongoDbResourceClass> $resource("https://api.mongolab.com/api/1/databases"
			+ "/angularjs/collections/projects/:id"
			, { apiKey: '4f847ad3e4b08a2eed5f3b54' }
			, {
				update: updateDescriptor
			}
			);
		
		//looks to be a facade, invoking the singleton instance of ProjectClass
		Project.prototype.update = function (cb) {

			debugger;


			//not sure what "this" is or where the value of _id is comming from
			return Project.update({ id: this._id.$oid }
					, angular.extend(
					{}
						, this
						, { _id: undefined }
						)
					, cb
					);
		};
		Project.prototype.destroy = function (cb) {
			return Project.remove({ id: this._id.$oid }, cb);
		};

		return Project;
	}


}