
var _writeBody = document.createElement("span");
document.body.appendChild(_writeBody);

interface String {
	format(...args: any[]): string;
}
String.prototype.format = function (...args: any[]) {
	return this.replace(/\{(\d+)\}/g, function (match, number) {
		return typeof args[number] !== "undefined"
		  ? args[number]
		  : match
			;
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


function write(value: any) {
	var toStr: string;
	if (value == null) {
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
module ScriptLoaderAsync {
	class ScriptInfo {
		isScriptLoaded = false;
		isScriptAttachedToDom = false;
		scriptElement: HTMLScriptElement;
		debugRetries = 0;

		constructor(public scriptPath: string) {
			this.scriptElement = <HTMLScriptElement>document.createElement("script");
			this.scriptElement.onload = () => {
				console.assert(this.isScriptLoaded === false);
				this.isScriptLoaded = true
				isCallbackInProgress = false;
				tryExecuteNext();
			};
			this.scriptElement.async = true;
			this.scriptElement.src = scriptPath;
		}
	}
	var scriptStorage = new ScriptInfo[];
	var nextIndex = -1;
	var isCallbackInProgress = false;

	function tryExecuteNext(): void {

		if (isCallbackInProgress) {
			return;
		}

		nextIndex++;
		if (nextIndex >= scriptStorage.length) {
			nextIndex--;
			isCallbackInProgress = false;
			return;
		}


		var scriptInfo = scriptStorage[nextIndex];
		console.assert(!scriptInfo.isScriptLoaded);
		console.assert(!scriptInfo.isScriptAttachedToDom);


		//when this finishes attaching, the callback will occur which will proceed to the next call of .tryExecuteNext()
		if (!scriptInfo.isScriptAttachedToDom) {
			isCallbackInProgress = true;
			document.body.appendChild(scriptInfo.scriptElement);
			scriptInfo.isScriptAttachedToDom = true;
		} else {
			console.assert(!isCallbackInProgress);
		}
		return;


	}

	/** asynchronously load your scripts, and execute them in the order they are enqueued */
	export function enqueue(scriptPath: string) {

		var scriptInfo = new ScriptInfo(scriptPath);
		scriptStorage.push(scriptInfo);
		if (!isCallbackInProgress) {
			tryExecuteNext();
		}
	}
}



/** async load scripts, and execute them (in order) during the .onLoad() event
use to allow rendering of html to finish, while your script is loaded afterwards.
will execute after dom load, during the window.onload() call, thus after ScriptLoaderAsync completes
to use, call .enqueue(scriptPath);
*/
module ScriptLoaderDeferred {



	//other helpers go here
	private scriptsToDeferLoad = new string[];
	/* debug helper to verify scripts only loaded once */
	private isScriptLoaded = new bool[];
	private isWindowLoaded = false


	//constructor() 
	{

		// Check for browser support of event handling capability
		if (window.addEventListener) {
			window.addEventListener("load", () => onWindowLoad(), false);
		}
		else if (window.attachEvent) {
			window.attachEvent("onload", () => onWindowLoad());
		}
		else {
			window.onload = () => onWindowLoad();
		}
	}

	/** async load this script, but execute only on window.onLoad(), and executes in order, based on order of enqueue */
	export function enqueue(scriptPath: string) {

		//implement delay load functionality here
		if (this.isWindowLoaded) {
			var i = scriptsToDeferLoad.length;
			scriptsToDeferLoad.push(scriptPath);
			isScriptLoaded.push(false);
			console.assert(i === this.scriptsToDeferLoad.length - 1, "multiple threads running at same time?  this DeferScriptLoader class is not designed to handle it");
			loadNext(i);
			return;
		} else {
			scriptsToDeferLoad.push(scriptPath);
			isScriptLoaded.push(false);
			console.assert(!this.isWindowLoaded);
		}
	}

	private onWindowLoad() {
		console.assert(!isWindowLoaded);
		if (isWindowLoaded) {
			return;
		}
		isWindowLoaded = true;

		loadNext(0);
	}

	private loadNext(i: number) {
		var scriptPath: string;
		//get the next array slot with a script
		while (true) {

			//none left in the array, stop and unwind our recursion
			if (i >= scriptsToDeferLoad.length) {
				return;
			}
			console.assert(isScriptLoaded[i] === false, "why was this script already loaded?  multithread race condition?");
			{
				if (isScriptLoaded[i] === true) {
					i++;
					continue;
				}
				//mark this script as being loaded, to help find race condition bugs if we try loading it again
				isScriptLoaded[i] = true;
			}

			console.assert(scriptsToDeferLoad[i] != null, "why is this script null?");

			if (scriptsToDeferLoad[i] == null) {
				//this slot is empty for some reason
				i++;
				continue;
			} else {
				//got our script, break the while loop
				scriptPath = scriptsToDeferLoad[i];
				break;
			}
		}

		var element = <HTMLScriptElement>document.createElement("script");
		element.src = scriptPath;
		//create a callback to recursively load the next script, but only after this script is finished loading (to avoid async loading)
		element.onload = () => loadNext(i + 1);
		document.body.appendChild(element);
		return element;
	}

}

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



