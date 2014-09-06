/* jQuery effects to album */

/* Cretaing albumPicasso object*/
var albumPicasso = {
	name : 'The Colors',
	artist : 'Pablo Picasso',
	label : 'Cubism',
	year : '1881',
	albumArtUrl : '/images/album_placeholder.png',
	songs : [
				{ name : 'Blue', length : '4:26' },
				{ name : 'Green', length : '3;14' },
				{ name : 'Red', length : '5:01' },
				{ name : 'Pink', length : '3:21' },
				{ name : 'Magenta', length : '2:15' }
	]
};


/* Creating albumMarconi object*/
var albumMarconi = {
	name : 'Marconi',
	artist : 'Guglielmo Marconi',
	label : 'EM',
	year : '1909',
	albumArtUrl : '/images/album_placeholder.png',
	songs : [
				{ name : 'Hello, Operator?', length : '1:01' },
				{ name : 'Ring, ring, ring', length : '5.01' },
				{ name : 'Fits in your pocket', length : '3:21'},
				{ name : 'Can you hear me now?', length : '3:14'},
				{ name : 'Wrong phone number', length : '2:15'},
	]
};

/* Track score function returns a complete JQuery object */

var createSongRow = function(songNumber, songName, songLength) {
	var template =
			'<tr>'
		+	'	<td class="col-md-1">' + songNumber + '</td>'
		+	'	<td class="col-md-9">' + songName + '</td>'
		+	'	<td class="col-md-2">' + songLength + '</td>'
		+ '</tr>';
		return $(template); // fills <table class="album-song-listing table"></table>
};

/*var createAlbumMarconi = function() {
	var album = albumMarconi;

		//Update album title
		var $albumTitle = $('.album-title');
		$albumTitle.text(album.name); //passing 'Marconi' to albumTitle

		//Upate album artist
		var $albumArtist = $('.album-artist');
		$albumArtist.text(album.artist);

		// Update the meta info
		var $albumMeta = $('.album-meta-info');
		$albumMeta.text(album.year + " on "  + album.label);

		//Update album image
		var $albumImage = $('.album-image img');
		$albumImage.attr('src', album.albumArtUrl);

		// Update the song list
		var $songList = $('.album-song-listing');
		$songList.empty();
		var songs = album.songs;
		for (var i = 0; i < songs.length; i++) {
			var songData = songs[i];
			var $newRow = createSongRow(i + 1, songData.name, songData.length);
			$songList.append($newRow);
		}
};*/

/*var createAlbumPicasso = function() {
	var album = albumPicasso;

		//Update album with Picasso properties
		var $albumTitle = $('.album-title');
		$albumTitle.text(album.name);

		var $albumArtist = $('.album-artist');
		$albumArtist.text(album.artist);

		var $albumMeta = $('.album-meta-info');
		albumMeat.text(album.year + " on " + album.label);

		var $albumArtUrl = $('.album-image img');
		albumArtUrl.attr('src', album.albumArtUrl);

		var $songList = $('.album-song-listing');
		$songList.empty();
		var songs = album.songs;
		for (var i = 0; i < songs.length; i++) {
			var songData = songs[i];
			var $newRow = createSongRow(i + 1, songData.name, songData.length );
			$songList.append($newRow); //populate $songList with $newRow
		}
};*/

var changeAlbumView = function(album) {
	var $albumTitle = $('.album-title');
	$albumTitle.text(album.name);

	var $albumArtist = $('.album-artist');
	$albumArtist.text(album.artist);

	var $albumMeta = $('.album-meta-info');
	$albumMeta.text(album.year + " on " + album.label);

	var $albumImage = $('.album-image img');
	$albumImage.attr('src', album.albumArtUrl);

	var $songList = $('.album-song-listing');
	$songList.empty();
	var songs = album.songs;
	for (var i = 0; i < songs.length; i++) {
		var songData = songs[i];
		var $newRow = createSongRow(i + 1, songData.name, songData.length);
		$songList.append($newRow);
	}

};

 // This 'if' condition is used to prevent the jQuery modifications
 // from happening on non-Album view pages.
 //  - Use a regex to validate that the url has "/album" in its path.

 if (document.URL.match(/\/album.html/)) {
 	$(document).ready(function() {
 		changeAlbumView(albumMarconi);
 		$('.album-container').click(function() {
 			changeAlbumView(albumPicasso);
 		});
 	});
 }