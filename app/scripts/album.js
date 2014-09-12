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
var currentPlayingSong = null;

var createSongRow = function(songNumber, songName, songLength) {
	var template =
			'<tr>'
		+	'	<td class="song-number col-md-1" data-song-number="' + songNumber + '">' + songNumber + '</td>'
		+	'	<td class="col-md-9">' + songName + '</td>'
		+	'	<td class="col-md-2">' + songLength + '</td>'
		+ '</tr>'
		;

		var $row = $(template);

		// Change from a song number to play button when the song isn't playing and we hover over the row.
		var onHover = function(event) {
			songNumberCell = $(this).find('.song-number');
			songNumber = songNumberCell.data('song-number');
			if (songNumber !== currentPlayingSong) {
				songNumberCell.html('<a class="album-song-button"><i class="fa fa-play"></i></a>');
			}
		};

		// Change from a play button to song number when the song isn't playing and we hover off the row.
		var offHover = function(event) {
			songNumberCell = $(this).find('.song-number');
			songNumber = songNumberCell.data('song-number');
			if (songNumberCell !== currentPlayingSong) {
					songNumberCell.html(songNumber);
			}
		};

		$row.find('.song-number').click(clickHandler);
		$row.hover(onHover, offHover);
		return $row;
};

/* Create clickhandler to show play, pause or song number*/
var clickHandler = function(event) {
	songNumber = $(this).data('song-number');

	if (currentPlayingSong !== null) {
		 // Revert to song number for currently playing song because user started playing new song.
			currentPlayingCell = $('.song-number[data-song-number="' + currentPlayingSong + ' "]');
			currentPlayingCell.html(currentPlayingSong);
	}
	if (currentPlayingSong !== songNumber) {
		// Switch from Play -> Pause button to indicate new song is playing.
		$(this).html('<a class="album-song-button"><i class="fa fa-pause"></i></a>');
		currentPlayingSong = songNumber;
	} else if (currentPlayingSong === songNumber) {
		// Switch from Pause -> Play button to pause currently playing song.
		$(this).html('<a class="album-song-button"><i class="fa fa-play"></i></a>');
		currentPlayingSong = null;
	}
};


/* Function with album object as parameter */
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


/*  functional player controls */
var updateSeekPercentage = function($seekBar, event) {
	var barWidth = $seekBar.width();
	var offsetX = event.pageX - $seekBar.offset().left; // get distance from
																											//mouse click(event.pageX) - offset() from left most pt on seekbar

	var offsetXPercent = (offsetX / $seekBar.width()) * 100; //offsetXpercent = offsetX / total width x 100% => pass it as value
	offsetXPercent = Math.max(0, offsetXPercent);						// to css left:offsetXPercent %
	offsetXPercent = Math.min(100, offsetXPercent);

	// implement UI changes
	var percentageString = offsetXPercent + '%';
	$seekBar.find('.fill').width(percentageString); //fill up to percentageString
	$seekBar.find('.thumb').css({'left' : percentageString}); // shift left to percentageString
};


/* moves .fill and .thumb to click event  */
var setupSeekBars = function() {
	$seekBars = $('.player-bar .seek-bar');
	$seekBars.click(function(event) {
		updateSeekPercentage($(this), event);
	});

/* musedown, mouseup events */
	$seekBars.find('.thumb').mousedown(function(event) {
		var $seekBar = $(this).parent();
		$seekBar.addClass('no-animate');

		$(document).bind('mousemove.thumb', function(event) {
			updateSeekPercentage($seekBar, event);
		});

		//cleanup
		$(document).bind('mouseup.thumb', function() {
			$seekBar.removeClass('no-animate');

			$(document).unbind('mousemove.thumb');
			$(document).unbind('mouseup.thumb');
		});
	});
};


/*  mouse co-ordinates function */
var mouseCoOrdinates = function() {
	$(this).click(function(eventX, eventY) {
		console.log('mouse co-ordinates are: x: ' + event.pageX + ' y: ' + event.pageY );
	});
};


 // This 'if' condition is used to prevent the jQuery modifications
 // from happening on non-Album view pages.
 //  - Use a regex to validate that the url has "/album" in its path.

 if (document.URL.match(/\/album.html/)) {
 	$(document).ready(function() {
 		changeAlbumView(albumMarconi);
 		setupSeekBars();
 		mouseCoOrdinates();
 		$('.album-header-container').click(function() {
 			changeAlbumView(albumPicasso);
 		});
 	});
 }