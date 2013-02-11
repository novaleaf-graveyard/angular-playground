var Student = (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullname = "%s %s %s" , firstName , middleInitial , lastName;
    }
    return Student;
})();
var Teacher = (function () {
    function Teacher(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullname = "%s %s %s" , firstName , middleInitial , lastName;
    }
    return Teacher;
})();
var unused;
function greeter(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
var user = new Student("jane", "M.", "User");
function write(value) {
    document.body.innerHTML += (value === undefined ? "null" : value.toString()) + "<br/>";
}
write(greeter(user))//implicitly cast Student to Person (ducktyping)
;
//"Hello, jane User"
//@ sourceMappingURL=greeter.js.map
