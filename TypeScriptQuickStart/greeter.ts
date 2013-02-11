class Student implements Person {
	fullname: string;
	constructor(public firstName: string, public middleInitial, public lastName: string) {
		this.fullname = "%s %s %s", firstName, middleInitial, lastName;
	}
}

class Teacher implements Person {
	fullname: string;
	salary: number;
	constructor(public firstName: string, public middleInitial, public lastName: string) {
		this.fullname = "%s %s %s", firstName, middleInitial, lastName;
	}
}


interface Person {
	firstName: string;
	lastName: string;
}

interface Owned {
	id: string;
}

var unused;


function greeter(person: Person) {
	return "Hello, " + person.firstName + " " + person.lastName;
}

var user = new Student("jane", "M.", "User");

function write(value: any) {
	document.body.innerHTML += (value === undefined ? "null" : value.toString()) + "<br/>";
}

write(greeter(user)); //implicitly cast Student to Person (ducktyping)
//"Hello, jane User"











