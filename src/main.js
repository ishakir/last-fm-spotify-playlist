var LastFmApi = require('lastfmapi');
var SpotifyWebApi = require('spotify-web-api-node');
var _ = require('./find_unique')

var lastFmOptions = {
	api_key: process.env.LAST_FM_API_KEY,
    secret: process.env.LAST_FM_API_SECRET
}

var lastFmUsername = "Exeggcute3"
var period = "overall"
var limit = 10

var spotifyId = process.env.SPOTIFY_API_ID
var spotifySecret = process.env.SPOTIFY_API_SECRET

var spotifySearch = function(song, cb) {
	var spotify = new SpotifyWebApi()
	spotify.searchTracks("artist:" + song.artist + " track:" + song.name).then(function(data) {
		var chosenTrack = _.findUnique(song, data.body.tracks.items);
		cb(chosenTrack);
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
			console.log(spotifySong.name);
		});
	});
});

