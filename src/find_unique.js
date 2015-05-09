var getUnique = function(lastFmSong, spotifySearchResults) {
	var potentialTracks = spotifySearchResults.filter(function(spotifySong) {
		var name = spotifySong.name.toLowerCase();
		return name.indexOf("live") < 0 && name.indexOf("remix") < 0 && name.indexOf("radio edit") < 0;
	});
	var chosenTrack = potentialTracks[0];
}