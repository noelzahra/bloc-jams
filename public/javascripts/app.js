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
require.register("scripts/app", function(exports, require, module) {
require('./landing');
require('./collection');
});

;require.register("scripts/collection", function(exports, require, module) {
/*Jquery*/

var buildAlbumThumbnail = function() {
	var template =
		'<div class = "collection-album-container col-md-2">'
	+ '	<img src = "/images/album-placeholder.png">'
	+ '		<div class = "caption album-collection-info">'
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


var updateCollectionView = function() {
	var $collection = $(".collection-container .row");
	$collection.empty(); //clear old html album views in collection container

	var albumAmount = Math.floor((Math.random() * (100 - 25)) + 25);
	console.log("Number of albums:" + albumAmount);


	for (var i = 0; i < albumAmount; i++) {
		var $newThumbnail = buildAlbumThumbnail();
		$collection.append($newThumbnail);
	}
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