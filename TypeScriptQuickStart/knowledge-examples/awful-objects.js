//example awful Part: object (pg 107, javascript the good parts)
var i;
var word;
var text = "This oracle of comfort has so pleased me, " +
"That when I am in heaven I shall desire " +
"To see what this child does, " +
"and praise my Constructor.";

var words = text.toLocaleLowerCase().split(/[\s,.]+/);
//write(words);

var count = {};
for (var i = 0; i < words.length; i++) {
	var word = words[i];
	if (typeof count[word] === "number") {
		count[word] += 1;
	} else {
		count[word] = 1;
	}
}
write(count["this"]);
write(count["constructor"]);