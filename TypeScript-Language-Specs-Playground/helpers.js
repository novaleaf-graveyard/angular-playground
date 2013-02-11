var _writeBody = document.createElement("span");
document.body.appendChild(_writeBody);
String.prototype.format = function () {
    var args = [];
    for (var _i = 0; _i < (arguments.length - 0); _i++) {
        args[_i] = arguments[_i + 0];
    }
    return this.replace(/\{(\d+)\}/g, function (match, number) {
        return typeof args[number] !== "undefined" ? args[number] : match;
    });
};
///** return the keys defined in this object's properties (excludes prototypes) */
//function ownKeys(value: any) {
//	var keys = new string[];
//	for (var prop in value) {
//		if(value.hasOwnProperty(prop)) {
//			keys.push(prop);
//		}
//	}
//	return keys;
//}
function write(value) {
    var toStr;
    if(value == null) {
        toStr = "NULL";
    } else {
        toStr = value.toString();
    }
    _writeBody.innerHTML += "{0}<br/>\n".format(toStr);
}
//function clear() {
//	_writeBody.innerHTML = "";
//}
// Add a script element as a child of the body
/** asynchronously load your scripts (starting right now), but in order.
use to allow rendering of html to continue while your script is loading in the background.
will complete before the dom is loaded, and before window.onload() starts (thus, before ScriptLoaderDeffered starts)
to use, call .enqueue(scriptPath);
*/
var ScriptLoaderAsync;
(function (ScriptLoaderAsync) {
    var ScriptInfo = (function () {
        function ScriptInfo(scriptPath) {
            this.scriptPath = scriptPath;
            var _this = this;
            this.isScriptLoaded = false;
            this.isScriptAttachedToDom = false;
            this.debugRetries = 0;
            this.scriptElement = document.createElement("script");
            this.scriptElement.onload = function () {
                console.assert(_this.isScriptLoaded === false);
                _this.isScriptLoaded = true;
                isCallbackInProgress = false;
                tryExecuteNext();
            };
            this.scriptElement.async = true;
            this.scriptElement.src = scriptPath;
        }
        return ScriptInfo;
    })();    
    var scriptStorage = new Array();
    var nextIndex = -1;
    var isCallbackInProgress = false;
    function tryExecuteNext() {
        if(isCallbackInProgress) {
            return;
        }
        nextIndex++;
        if(nextIndex >= scriptStorage.length) {
            nextIndex--;
            isCallbackInProgress = false;
            return;
        }
        var scriptInfo = scriptStorage[nextIndex];
        console.assert(!scriptInfo.isScriptLoaded);
        console.assert(!scriptInfo.isScriptAttachedToDom);
        //when this finishes attaching, the callback will occur which will proceed to the next call of .tryExecuteNext()
        if(!scriptInfo.isScriptAttachedToDom) {
            isCallbackInProgress = true;
            document.body.appendChild(scriptInfo.scriptElement);
            scriptInfo.isScriptAttachedToDom = true;
        } else {
            console.assert(!isCallbackInProgress);
        }
        return;
    }
    /** asynchronously load your scripts, and execute them in the order they are enqueued */
    function enqueue(scriptPath) {
        var scriptInfo = new ScriptInfo(scriptPath);
        scriptStorage.push(scriptInfo);
        if(!isCallbackInProgress) {
            tryExecuteNext();
        }
    }
    ScriptLoaderAsync.enqueue = enqueue;
})(ScriptLoaderAsync || (ScriptLoaderAsync = {}));
/** async load scripts, and execute them (in order) during the .onLoad() event
use to allow rendering of html to finish, while your script is loaded afterwards.
will execute after dom load, during the window.onload() call, thus after ScriptLoaderAsync completes
to use, call .enqueue(scriptPath);
*/
var ScriptLoaderDeferred;
(function (ScriptLoaderDeferred) {
    //other helpers go here
    ScriptLoaderDeferred.scriptsToDeferLoad = new Array();
    /* debug helper to verify scripts only loaded once */
    ScriptLoaderDeferred.isScriptLoaded = new Array();
    ScriptLoaderDeferred.isWindowLoaded = false;
    //constructor()
     {
        // Check for browser support of event handling capability
        if(window.addEventListener) {
            window.addEventListener("load", function () {
                return onWindowLoad();
            }, false);
        } else if(window.attachEvent) {
            window.attachEvent("onload", function () {
                return onWindowLoad();
            });
        } else {
            window.onload = function () {
                return onWindowLoad();
            };
        }
    }
    /** async load this script, but execute only on window.onLoad(), and executes in order, based on order of enqueue */
    function enqueue(scriptPath) {
        //implement delay load functionality here
        if(this.isWindowLoaded) {
            var i = ScriptLoaderDeferred.scriptsToDeferLoad.length;
            ScriptLoaderDeferred.scriptsToDeferLoad.push(scriptPath);
            ScriptLoaderDeferred.isScriptLoaded.push(false);
            console.assert(i === this.scriptsToDeferLoad.length - 1, "multiple threads running at same time?  this DeferScriptLoader class is not designed to handle it");
            loadNext(i);
            return;
        } else {
            ScriptLoaderDeferred.scriptsToDeferLoad.push(scriptPath);
            ScriptLoaderDeferred.isScriptLoaded.push(false);
            console.assert(!this.isWindowLoaded);
        }
    }
    ScriptLoaderDeferred.enqueue = enqueue;
    function onWindowLoad() {
        console.assert(!ScriptLoaderDeferred.isWindowLoaded);
        if(ScriptLoaderDeferred.isWindowLoaded) {
            return;
        }
        ScriptLoaderDeferred.isWindowLoaded = true;
        loadNext(0);
    }
    ScriptLoaderDeferred.onWindowLoad = onWindowLoad;
    function loadNext(i) {
        var scriptPath;
        //get the next array slot with a script
        while(true) {
            //none left in the array, stop and unwind our recursion
            if(i >= ScriptLoaderDeferred.scriptsToDeferLoad.length) {
                return;
            }
            console.assert(ScriptLoaderDeferred.isScriptLoaded[i] === false, "why was this script already loaded?  multithread race condition?");
 {
                if(ScriptLoaderDeferred.isScriptLoaded[i] === true) {
                    i++;
                    continue;
                }
                //mark this script as being loaded, to help find race condition bugs if we try loading it again
                ScriptLoaderDeferred.isScriptLoaded[i] = true;
            }
            console.assert(ScriptLoaderDeferred.scriptsToDeferLoad[i] != null, "why is this script null?");
            if(ScriptLoaderDeferred.scriptsToDeferLoad[i] == null) {
                //this slot is empty for some reason
                i++;
                continue;
            } else {
                //got our script, break the while loop
                scriptPath = ScriptLoaderDeferred.scriptsToDeferLoad[i];
                break;
            }
        }
        var element = document.createElement("script");
        element.src = scriptPath;
        //create a callback to recursively load the next script, but only after this script is finished loading (to avoid async loading)
        element.onload = function () {
            return loadNext(i + 1);
        };
        document.body.appendChild(element);
        return element;
    }
    ScriptLoaderDeferred.loadNext = loadNext;
})(ScriptLoaderDeferred || (ScriptLoaderDeferred = {}));
//enum MyEnum {
//	red=4,
//	distance=1.1,
//	//color="greenish blue",
//}
//function testt(someVar: MyEnum) {
//	write(someVar);
//	for(var x in each(
//}
//testt(MyEnum.red);
//var t = MyEnum.red;
//var testKeys = ownKeys(t);
//for (var x = 0; x < testKeys.length; x++) {
//	write(testKeys[x]);
//}
//testKeys = ownKeys(MyEnum);
//for (var x = 0; x < testKeys.length; x++) {
//	write(testKeys[x]);
//}
//testKeys = ownKeys(ScriptLoaderAsync);
//for (var x = 0; x < testKeys.length; x++) {
//	write(testKeys[x]);
//}
//testKeys = ownKeys(testKeys);
//for (var x = 0; x < testKeys.length; x++) {
//	write(testKeys[x]);
//}
//testKeys = ownKeys(_writeBody);
//for (var x = 0; x < testKeys.length; x++) {
//	write(testKeys[x]);
//}
//enum MyEnum {
//	red=4,
//	distance=1.1,
//	//color="greenish blue",
//}
//function testt(someVar: MyEnum) {
//	write(someVar);
//	for(var x in each(
//}
//testt(MyEnum.red);
//var t = MyEnum.red;
//var testKeys = ownKeys(t);
//for (var x = 0; x < testKeys.length; x++) {
//	write(testKeys[x]);
//}
//testKeys = ownKeys(MyEnum);
//for (var x = 0; x < testKeys.length; x++) {
//	write(testKeys[x]);
//}
//testKeys = ownKeys(ScriptLoaderAsync);
//for (var x = 0; x < testKeys.length; x++) {
//	write(testKeys[x]);
//}
//testKeys = ownKeys(testKeys);
//for (var x = 0; x < testKeys.length; x++) {
//	write(testKeys[x]);
//}
//testKeys = ownKeys(_writeBody);
//for (var x = 0; x < testKeys.length; x++) {
//	write(testKeys[x]);
//}
//@ sourceMappingURL=helpers.js.map
