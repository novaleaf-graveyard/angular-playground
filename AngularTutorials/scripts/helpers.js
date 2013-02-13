/** @define {boolean} */
var DEBUG_MODE = true;
var Logger;
(function (Logger) {
    "use strict";
    Logger.assert;
    if(DEBUG_MODE) {
        Logger.assert = function (condition, message) {
            var optionalParams = [];
            for (var _i = 0; _i < (arguments.length - 2); _i++) {
                optionalParams[_i] = arguments[_i + 2];
            }
            if(!condition) {
                debugger;

                console.error(message, optionalParams);
            } else {
            }
        };
    } else {
        Logger.assert = function (condition, message) {
            var optionalParams = [];
            for (var _i = 0; _i < (arguments.length - 2); _i++) {
                optionalParams[_i] = arguments[_i + 2];
            }
        };
    }
})(Logger || (Logger = {}));
//@ sourceMappingURL=helpers.js.map
