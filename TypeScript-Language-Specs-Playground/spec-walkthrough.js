var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
//load up local helper scripts, need to reference this in the html <script> tag too though
/// <reference path="helpers.ts" />
//the "write()" method is specified in the helpers.ts file
write("hello, world!");
/////////////////////////////////////////////////////
write("//////////// 1.1 : ambient declarations");
document.title = "Hello section 1.1";
//declare var $;  //define and use of a missing variable will cause runtime errors (this will if used with no jQuery installed)
/////////////////////////////////////////////////////
write("//////////// 1.2 : functions types");
//strongly typed definitions
function vote(candidate, callback) {
    //stuff
    return callback(candidate);
}
var voteResult = vote("Big Pig", function (result) {
    //use this explicit "function" way if you want "this" to be the function
    //write(typeof (this));
    if(result === "Big Pig") {
        return "I accept";
    }
    return "I refuse to loose";
});
//write(voteResult);
//alt declarations
voteResult = vote("Short Wolf", function (result) {
    //use this lambda way if you want "this" to be the parent scope
    //write(typeof (this));
    if(result === "Big Pig") {
        return "I accept";
    }
    return "I refuse to loose!";
});
//write(voteResult);
/////////////////////////////////////////////////////
write("//////////// 1.3 : Object types");
//specify variable type without implementation
var MakePoint;
try  {
    var result = MakePoint();//throws exception.  need to specify implementation first
    
} catch (ex) {
}//provide an implementation that matches definition

MakePoint = function () {
    return {
        x: 3,
        y: 4
    };
};
result = MakePoint();
//optional
function add(friend) {
    var name = friend.name;
    var color = friend.favoriteColor || "";
    //write(name + color);
    }
add({
    name: "Fred"
})//ok
;
//add({ favoriteColor: "Green" });//static error
add({
    name: "Sally",
    favoriteColor: "Blue"
});
$.get("helpers.ts", function (data) {
    //don't use the data in the next calls, just because it's very verbose.
    write("///1.3 callback from $.get() <br/>");
    $("div").text("///1.3 callback write to <div> by $.get()<br/> ");
});
//examples of function types
var f;//define a variable of type function

var sameType;//another variable with same type

sameType = f//assign works, same type
;
var nope;
$(function () {
    return write("//1.3 example, showing overloads.  this is invoked when dom is ready");
});
///////////////////////////////////////////////
write("//////////// 1.4 : Structural Subtyping");
function getX(p) {
    return p.x;
}
////other ways of writing getX()
//var getX = (p: Point) => p.x;
//function getX(p: Point) => p.x;
//function getX(p: Point) => {
//	return p.x;
//}
var Point = (function () {
    //implicitly implements interface IPoint
    function Point(x, y, z) {
        this.x = x;
        this.y = y;
    }
    return Point;
})();
//z is optional
getX(new Point(0, 0))// ok, req fields match
;
getX({
    x: 0,
    y: 1,
    z: 2
})//ok, extra fields
;
//getX({ x: 0 });//static error: required parameters not existing
var p;
var point = {
    x: 1,
    y: 2
};
p = point;
///////////////////////////////////////////////
write("//////////// 1.5 : Contextual Typing");
//example of botom-up inference (return type of "mul")
function mul(a, b) {
    //infers return value
    return a * b;
}
//write(mul(3, 4.11111));
//example of top-down inference (type of "data")
$.get("app.css", function (data) {
    //$("div").text(data); // typescript infers data is a string
    });
///////////////////////////////////////////////
write("//////////// 1.6 : Classes");
////normal TS way of writing a class
//class BankAccount{
//	balance = 0;
//	deposit(credit: number) {
//		this.balance += credit;
//		return this.balance;
//	}
//}
//////instead, write BankAccount as an interface
//interface IBankAccount {
//	balance: number;
//	deposit(credit: number): number;
//	constructor();
//}
////define the type of BankAccount (as a "IBankAccount Constructor")
//var BankAccount: new () => IBankAccount;
////now provide the implementation
//BankAccount = (function() {
//	function BankAccount() {
//		this.balance = 0;
//	}
//	BankAccount.prototype.deposit = function(credit){
//		this.balance += credit;
//		return this.balance;
//	};
//	return BankAccount;
// }) ();
//var myAccount = new BankAccount();
//myAccount.deposit(4);
////write("my account balance = {0}".format(myAccount.balance));
//normal TS way of writing a class, with extra constructor
var BankAccount = (function () {
    function BankAccount(initialBalance, initialBankName) {
        if (typeof initialBalance === "undefined") { initialBalance = 0; }
        this.balance = initialBalance;
        if(initialBankName != null) {
            throw "initial bank not supported";
            //write("initial bank not supported");
                    }
    }
    BankAccount.bankName = "myBank";
    BankAccount.prototype.deposit = function (credit) {
        this.balance += credit;
        return this.balance;
    };
    BankAccount.prototype.toString = function () {
        return this.balance.toString();
    };
    return BankAccount;
})();
var myAccount = new BankAccount(42);
//write(myAccount);
var CheckingAccount = (function (_super) {
    __extends(CheckingAccount, _super);
    function CheckingAccount(initialBalance) {
        _super.call(this, initialBalance);
    }
    CheckingAccount.prototype.writeCheck = function (debit) {
        this.balance -= debit;
    };
    return CheckingAccount;
})(BankAccount);
myAccount = new CheckingAccount(50);
//write(BankAccount.bankName);
//write(CheckingAccount.bankName); //static error, does not exist
///////////////////////////////////////////////
write("//////////// 1.7 : Modules");
//normal javascript pattern of creating modules
 {
    function generateSecretKey() {
        return "sekret";
    }
    function sendSecureMessage(message, key) {
        //noop
        //write(message + key);
            }
    var MessageModule = {
    };
    (function (exports) {
        var key = generateSecretKey();
        function sendMessage(message) {
            sendSecureMessage(message, key);
        }
        exports.sendMessage = sendMessage;
    })(MessageModule);
    MessageModule.sendMessage("my message");
    MessageModule.sendMessage("another message!");
}
//typescript module pattern (generates normal javascript module pattern)
var Mod;
(function (Mod) {
    var s = "hello";
    function f() {
        return s;
    }
    Mod.f = f;
})(Mod || (Mod = {}));
var otherMod;
otherMod = Mod;
//write(otherMod.f());
///////////////////////////////////////////////
write("//////////// 3.2.1 : number type");
var x;
var y = 0;
var z = 123.456;
//write(z);
var s = z.toFixed(2);
//write(s);
///////////////////////////////////////////////
write("//////////// ");
///////////////////////////////////////////////
write("//////////// ");
write("////////  SUCCESS!!!!     eof");
//@ sourceMappingURL=spec-walkthrough.js.map
