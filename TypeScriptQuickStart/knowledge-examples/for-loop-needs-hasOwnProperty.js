
/* example showing how for loop over array has problems if anyone modifies array prototype.
*/

Array.prototype.filter_0 = function() {
	var res = [];
	for (var i = 0; i < this.length; i++) {
		if (this[i] !== 0) {
			res.push(this[i]);
		}
	}
	return res;
};

write([0, 5, 0, 3, 0, 1, 0].filter_0());
//prints [5,3,1]
console.log([0, 5, 0, 3, 0, 1, 0].filter_0());

var listeners = ["a", "b", "c"];
for (var item in listeners.slice(0,1)) {
	write(item);
}
