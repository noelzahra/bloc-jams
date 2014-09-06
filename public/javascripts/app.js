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
});

;require.register("scripts/app", function(exports, require, module) {
/* Holds all the scripts for the specific pages */

require('./landing');
require('./collection');
require('./album');
});

;require.register("scripts/collection", function(exports, require, module) {
/*Jquery*/

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
/* JQuery */
$(document).ready (function() {
	$('.hero-content h3').click(function() {
		subText = $(this).text();
		$(this).text(subText + " * ");
	});

	$('.selling-points .point h5').click(function() {
		$(this).css({'font-size' : '24pt', 'text-transform' : 'uppercase'});
	});

	$('.hero-content').click(function () {
		$(this).fadeIn('slow', function() {
			$(this).css({'background' : 'url(/images/band_hero2.jpg)', 'background-position' : '50% 10%', 'background-size' : 'cover'});
		});
	});

	var onHoverShiftRight = function() {
		$(this).animate({'margin-left' : '100px'});
	};

	var offHoverShiftLeft = function() {
		$(this).animate({'margin-left' : '0'})
	};

	var onHoverTurnYellow = function() {
		$(this).css({'color' : 'yellow'});
	};

	var offHoverTurnOrange = function() {
		$(this).css({'color' : '#EB7F00'});
	}

	$('.navbar .navbar-header img').hover(onHoverShiftRight, offHoverShiftLeft);
	$('.hero-content h1').hover(onHoverTurnYellow, offHoverTurnOrange);
});


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