(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path].exports;
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex].exports;
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
require.register("scripts/album", function(exports, require, module) {
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

	var offsetXPercent = (offsetX / $seekBar.width()) * 100; //offsetXpercent = offsetX / total width x 100% => pass it as value to css left:offsetXPercent %
	offsetXPercent = Math.max(0, offsetXPercent);	// takes value > 0
	offsetXPercent = Math.min(100, offsetXPercent); //takes value < 100

	// implement UI changes
	var percentageString = offsetXPercent + '%';
	$seekBar.find('.fill').width(percentageString); //fill up to percentageString
	$seekBar.find('.thumb').css({'left' : percentageString}); // shift left to percentageString
};


/* moves .fill and .thumb to click event  */
var setupSeekBars = function() {
	$seekBars = $('.player-bar .seek-bar');
	$seekBars.click(function(event) {
		updateSeekPercentage($(this), event); //returning $seekBar
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
});

;require.register("scripts/app", function(exports, require, module) {
/* Holds all the scripts for the specific pages */

require('./landing');
require('./collection');
require('./album');
require('./profile');
});

;require.register("scripts/collection", function(exports, require, module) {
/* jQuery fior collection view */

var buildAlbumThumbnail = function() {
	var template =
		'<div class="collection-album-container col-md-2">'
	+ '		<div class="collection-album-image-container">'
	+ '			<img src="/images/album-placeholder.png">'
	+ '		</div>'
	+ '		<div class="caption album-collection-info">'
	+ '			<p>'
	+	'				<a class="album-name" href="/album.html">Album Name</a>'
	+ '				<br />'
	+ '				<a href="/album.html">Artist name</a>'
	+ '				<br />'
	+ '				X songs'
	+ '				<br/>'
	+	'				X:XX Total Length'
	+ '			</p>'
	+	'		</div>'
	+ '	</div>';

	return $(template); //returns a Jquery object $(template) an HTML div
};

var buildAlbumOverlay = function(albumURL) {
	var template =
			'<div class="collection-album-image-overlay">'
		+	' <div class="collection-overlay-content">'
		+	'   <a class="collection-overlay-button" href="' + albumURL + '">'
		+	'    <i class="fa fa-play"></i>'
		+	'   </a>'
		+	'		&nbsp;'
		+ '   <a class="collection-overlay-button">'
		+ '			<i class="fa fa-plus"></i>'
		+ '   </a>'
		+	' </div>'
		+	'</div>'
		;
	return $(template);
};

var updateCollectionView = function() {
	var $collection = $('.collection-container .row');
	$collection.empty(); //clear old html album views in collection container

	var albumAmount = Math.floor((Math.random() * (100 - 25)) + 25);
	console.log("Number of albums:" + albumAmount);


	for (var i = 0; i < albumAmount; i++) {
		var $newThumbnail = buildAlbumThumbnail();
		$collection.append($newThumbnail);
	}

	var onHover = function(event) {
		$(this).append(buildAlbumOverlay('/album.html'));
	};

	var offHover = function(event) {
		$(this).find('.collection-album-image-overlay').remove();
	};

	$collection.find('.collection-album-image-container').hover(onHover, offHover);
};

if (document.URL.match(/\/collection.html/)) {
	//Wait until HTML is fully processed
	$(document).ready(function() {
		updateCollectionView();
	});
}
});

;require.register("scripts/landing", function(exports, require, module) {
/* jQuery for landing page */

var newContent = function() {
	var template =
		'	<div class="container">'
	+	'		<h1><span>Stay tuned…</span><br />'
	+	'			new events<br />'
	+	'			coming this<br />'
	+	'			winter'
	+	' 	</h1>'
	+	'	</div>'
	;
	return $(template);
};

/* Update hero content */
var showNewHeroContent = function() {
	$('.hero-content').click(function () {
		$(this).empty();
		$(this).append(newContent());
		$(this).fadeIn('slow', function() {
			$(this).css({'background' : 'url(images/band2.jpg) no-repeat', 'background-size' : 'cover'});
			console.log('Added new Hero content');
		});
	});
};

/* Overlay function */
var buildOverlay = function(pageURL) {
	var template =
		'	<div class="feature-box-overlay">'
	+	'		<div class="feature-box-overlay-content">'
	+	'			<a class="feature-box-overlay-button" href="' + pageURL + '">'
	+	'				<i class="fa fa-plus"></i>'
	+	'			</a>'
	+	'		</div>'
	+	'	</div>'
	;
	return $(template);
};


var applyOverlay = function () {
	$features = $('.feature-box');

	var onHover = function(event) {
		$(this).append(buildOverlay('/album.html'));
	};
	var offHover = function(event) {
		$(this).find('.feature-box-overlay').remove();
	};

	$features.hover(onHover, offHover);
	console.log('Applying hover on feature images')
};


if (document.URL.match(/\/index.html/)) {
	$(document).ready(function() {
		showNewHeroContent();
		applyOverlay();
	});
}
});

;require.register("scripts/profile", function(exports, require, module) {
/* jQuery for profile page */

var tabsContainer = ".user-profile-tabs-container";

var selectTabHandler = function(event) {
	$tab = $(this); //anchor (a href)
	$(tabsContainer + " li").removeClass('active');
	$tab.parent().addClass('active'); //parent is li

	var selectedTabName = $tab.attr('href');
	console.log(selectedTabName);

	$(".tab-pane").addClass('hidden'); //bootstrap class => display: none; we're hiding both tab-panes
	$(selectedTabName).removeClass('hidden'); // remove .hidden class only from selectedTabName =>
	event.preventDefault(); //prevents default behaviour
};

if (document.URL.match(/\/profile.html/)) {
	$(document).ready(function() {
		var $tabs = $(tabsContainer + " a");
		$tabs.click(selectTabHandler);
		$tabs[0].click();
	});
}
});

;require.register("server", function(exports, require, module) {
var http = require("http"),
    server;

server = http.createServer(function (req, res) {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("Hello World!\n");
});

server.listen(3000);

console.log("Server running on port 3000");

});

;
//# sourceMappingURL=app.js.map