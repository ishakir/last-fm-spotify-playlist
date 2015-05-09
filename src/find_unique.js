var findUnique = function(lastFmSong, spotifySearchResults) {
	var contains = function(string, phrase) { return string.toLowerCase().indexOf(phrase.toLowerCase()) > -1; }
	var lastFmContainsOrFilter = function(phrase) {
		return function(song) {
			return contains(lastFmSong.name, phrase) || !contains(song.name, phrase);
		};
	};
	var filters = [
		lastFmContainsOrFilter("live"),
		lastFmContainsOrFilter("remix"),
		lastFmContainsOrFilter("radio edit")
	];
	var filteredTracks = filters.reduce(function(currentFiltered, filter) {
		return currentFiltered.filter(filter);
	}, spotifySearchResults);
	return filteredTracks[0];
};

module.exports.findUnique = findUnique