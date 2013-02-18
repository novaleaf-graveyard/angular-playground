

/** @define {boolean} */
var DEBUG_MODE = true;


module Logger {
	"use strict"

	export var assert: (condition: bool, message: string, ...optionalParams: string[]) => void;

	if (DEBUG_MODE) {
		assert = function (condition: bool, message: string, ...optionalParams: string[]) {
			if (!condition) {
				debugger;
				console.error(message, optionalParams);

			} else {
				//nothing, SitNorm
			}
		};
	} else {
		assert = function (condition: bool, message: string, ...optionalParams: string[]) { };
	}



}