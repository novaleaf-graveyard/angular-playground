
//load up local helper scripts, need to reference this in the html <script> tag too though
/// <reference path="helpers.ts" />
//the "write()" method is specified in the helpers.ts file
write("hello, world!");


/////////////////////////////////////////////////////
write("//////////// 1.1 : ambient declarations");


//inform TS that other javascript sources have specified these variables already.
declare var document;
document.title = "Hello section 1.1";
//declare var $;  //define and use of a missing variable will cause runtime errors (this will if used with no jQuery installed)

/////////////////////////////////////////////////////
write("//////////// 1.2 : functions types");

//strongly typed definitions
function vote(candidate: string, callback: (result: string) => string): string {
	//stuff
	return callback(candidate);
}


var voteResult = vote("Big Pig",
	function (result: string) { //use this explicit "function" way if you want "this" to be the function
		//write(typeof (this));
		if (result === "Big Pig") {
			return "I accept";
		}
		return "I refuse to loose";
	}
);
//write(voteResult);

//alt declarations
voteResult = vote("Short Wolf",
	(result: string): string => { //use this lambda way if you want "this" to be the parent scope
		//write(typeof (this));
		if (result === "Big Pig") {
			return "I accept";
		}
		return "I refuse to loose!";
	});

//write(voteResult);


/////////////////////////////////////////////////////
write("//////////// 1.3 : Object types");

//specify variable type without implementation
var MakePoint: () => {
	x: number; y: number;
};

try {
	var result = MakePoint(); //throws exception.  need to specify implementation first
} catch (ex) {
//write(ex);
}
//provide an implementation that matches definition
MakePoint = function () {
	return { x: 3, y: 4 }
};
result = MakePoint();
//write(result);

////try definition that doesn't match  (static error)
//MakePoint = function () {
//	return { x: "nope", y: 4 }
//};


//////interfaces define types, but no implementation is allowed
interface Friend {
	name: string; //required
	favoriteColor?: string; //optional
}

function add(friend: Friend) {
	var name = friend.name;
	var color = friend.favoriteColor || "";
	//write(name + color);
}

add({ name: "Fred" }); //ok
//add({ favoriteColor: "Green" });//static error
add({ name: "Sally", favoriteColor: "Blue" });

//complex javascript objects, using jQuery as an example
interface JQuery {
	text(content: string);
}
interface JQueryStatic {
	get (url: string, callback: (data: string) => any);
	(query: string): JQuery; //defines that this object is also callable as a method
}

declare var $: JQueryStatic;

$.get("helpers.ts",
	function (data: string) {
		//don't use the data in the next calls, just because it's very verbose.
		write("///1.3 callback from $.get() <br/>");
		$("div").text("///1.3 callback write to <div> by $.get()<br/> ");
	}
);


//examples of function types
var f: { (): string; };  //define a variable of type function
var sameType: () => string; //another variable with same type
sameType = f;  //assign works, same type
var nope: () => number;
//nope = f; //static error: assign doesn't work, not same type;

//add an overload function sig to jquery:
interface JQueryStatic {
	(ready: () => any): any;
}
$(() => write("//1.3 example, showing overloads.  this is invoked when dom is ready"));




///////////////////////////////////////////////
write("//////////// 1.4 : Structural Subtyping");

interface IPoint {
	x: number;
	y: number;
}
function getX(p: IPoint) {
	return p.x;
}
////other ways of writing getX()
//var getX = (p: Point) => p.x;
//function getX(p: Point) => p.x;
//function getX(p: Point) => {
//	return p.x;
//}



class Point {  //implicitly implements interface IPoint
	constructor(public x: number, public y: number, z?: number) { } //z is optional
}


getX(new Point(0, 0)); // ok, req fields match
getX({ x: 0, y: 1, z: 2 });//ok, extra fields
//getX({ x: 0 });//static error: required parameters not existing


var p: IPoint;
var point = { x: 1, y: 2 };
p = point;

///////////////////////////////////////////////
write("//////////// 1.5 : Contextual Typing");

//example of botom-up inference (return type of "mul")
function mul(a: number, b: number) {  //infers return value 
	return a * b;
}
//write(mul(3, 4.11111));

//example of top-down inference (type of "data")
$.get("app.css",
	(data) => {
		//$("div").text(data); // typescript infers data is a string
	}
);

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
class BankAccount {
	static bankName: string = "myBank";
	balance: number;

	constructor(initialBalance: number = 0, initialBankName?: string) {
		this.balance = initialBalance;
		if (initialBankName != null) {
			throw "initial bank not supported";
			//write("initial bank not supported");
		}
	}
	deposit(credit: number) {
		this.balance += credit;
		return this.balance;
	}
	toString() {
		return this.balance.toString();
	}
}

var myAccount = new BankAccount(42);
//write(myAccount);

class CheckingAccount extends BankAccount {
	constructor(initialBalance: number) {
		super(initialBalance);
	}
	writeCheck(debit: number) {
		this.balance -= debit;
	}
}

myAccount = new CheckingAccount(50);
//write(BankAccount.bankName);
//write(CheckingAccount.bankName); //static error, does not exist




///////////////////////////////////////////////
write("//////////// 1.7 : Modules");

//normal javascript pattern of creating modules
{
	function generateSecretKey(): string {
		return "sekret";
	}
	function sendSecureMessage(message: string, key: string) {
		//noop
		//write(message + key);
	}
	var MessageModule: any = {};
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
module Mod {
	var s = "hello";
	export function f() {
		return s;
	}
}
//write(Mod.f());
//write(M.s); //static error, s is not exported

//modules can still work with interfaces
interface IMod {
	f(): string;
}
var otherMod: IMod;
otherMod = Mod;
//write(otherMod.f());




///////////////////////////////////////////////
write("//////////// 3.2.1 : number type");

var x: number;
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

