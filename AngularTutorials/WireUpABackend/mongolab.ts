/// <reference path="_all.ts"/>


module mongolab {



	/** definition of our custom Resource Class */
	export interface IMongoDbResourceClass extends ng.resource.IResourceClass {
		new (toClone :IMongoDbResource) : IMongoDbResource;
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

		/** mongodb resource specific values */
		_id: { $oid: string; };
		__proto__: IMongoDbResourceClass;
		/** mongodb our schema specific values value */
		description: string;
		name: string;
		site: string;
	}

	


	//cloud persistance
	angular.module("mongolab", ["ngResource"])
	.factory("Project", mongoDbResourceFactory);

	function mongoDbResourceFactory($resource: ng.resource.IResourceService): IMongoDbResourceClass  {

		//ngResource definition of an action descriptor, will inject this into our Project class below
		var updateDescriptor: ng.resource.IActionDescriptor = { method: "PUT" };

		//create the "Project" class (resource class) 
		var Project = <IMongoDbResourceClass> $resource("https://api.mongolab.com/api/1/databases"
			+ "/angularjs/collections/projects/:id"
			, { apiKey: '4f847ad3e4b08a2eed5f3b54' }
			,{
				update: updateDescriptor //injects our update as an "action descriptor"
			}
			);
		
		//looks to be a facade, invoking the singleton instance of ProjectClass
		//provide implemention of the update method
		Project.prototype.update = function (cb) {

			var _this = <IMongoDbResource>this;


			//not sure what "this" is or where the value of _id is comming from
			return Project.update({ id: _this._id.$oid }
					, angular.extend(
					{}
						, _this
						, { _id: undefined }
						)
					, cb
					);
		};
		//provide implemention of the destroy method
		Project.prototype.destroy = function (cb) {
			var _this = <IMongoDbResource>this;
			return Project.remove({ id: _this._id.$oid }, cb);
		};

		return Project;
	}



}