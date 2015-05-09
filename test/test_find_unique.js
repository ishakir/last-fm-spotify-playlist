var _ = require('../src/find_unique');
var assert = require('assert');

describe("The find unique method", function() {
	var types = ["live", "remix", "radio edit"]

	types.forEach(function(type) {
		it("should reject a " + type + " version if the original song entered wasn't a " + type + " version", function() {
			var song = {name: "Trick of the Tail"};
			var songs = [
				{name: "Trick of the Tail", id: 1},
				{name: "Trick of the Tail - " + type, id: 2}
			];
			assert.equal(_.findUnique(song, songs).id, 1);
		});	
	});

	types.forEach(function(type) {
		it("should return a " + type + " version if the origin song entered was a " + type + " version", function() {
			var song = {name: "Trick of the Tail - " + type};
			var songs = [{name: "Trick of the Tail - " + type, id: 1}];
			assert.equal(_.findUnique(song, songs).id, 1)
		});
	});
});