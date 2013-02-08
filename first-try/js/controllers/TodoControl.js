/// <reference path="../_all.ts"/>  //global references
var todos;
(function (todos) {
    "use strict";
    /** the main controller for the app.  The controller:
    - retrieves and persists the model via the todoStorage service
    - exposes the model to the template and provides event handlers */
    var TodoControl = (function () {
        function TodoControl() { }
        return TodoControl;
    })();
    todos.TodoControl = TodoControl;    
})(todos || (todos = {}));
//@ sourceMappingURL=TodoControl.js.map
