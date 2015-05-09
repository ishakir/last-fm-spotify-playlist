var LastFmApi = require('lastfmapi');
var SpotifyWebApi = require('spotify-web-api-node');
var _ = require('find_unique')

var lastFmOptions = {
	api_key: "039d988a5d05e2c73c2193d49d39eb4a",
    secret: "d77eb4c80c8041d05ffe51b610d66a6a"
}

var lastFmUsername = "Exeggcute3"
var period = "overall"
var limit = 10

var spotifyId = "42cded026a9f4d5eab9f797b8e6dadb7"
var spotifySecret = "c1bafc54558f4de4a288bfbacdd6f404"

var spotifySearch = function(song, cb) {
	var spotify = new SpotifyWebApi()
	spotify.searchTracks("artist:" + song.artist + " track:" + song.name).then(function(data) {
		_.findUnique(song, data.body.tracks.items);
		cb(chosenTrack.id);
	});
}

var getLastFmTracks = function(cb) {
	last_fm = new LastFmApi(lastFmOptions);

	last_fm.user.getTopTracks({
		user: lastFmUsername, 
		period: period, 
		limit: limit
	}, function(err, data) {
		cb(err, data.track.map(function(song) { return {name: song.name, artist: song.artist.name}; }));
	});
}

getLastFmTracks(function(err, data) {
	if(err) { console.log(err); }
	data.forEach(function(song) {
		spotifySearch(song, function(spotifySong) {
			console.log(spotifySong);
		});
	});
});

