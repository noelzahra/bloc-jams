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
require("./landing");
});

;require.register("scripts/landing", function(exports, require, module) {
/* JQuery */
$(document).ready(function () {
	$('.hero-content h3').click(function() {
		subText = $(this).text();
		$(this).text(subText + "*");
		console.log(subText);
	});

	$('.selling-points .point h5').click(function() {
		$(this).css({'font-size' : '1.8em', 'text-transform' : 'uppercase' });
		console.log('Capitalize selling-points h5');
	});

	$('.hero-content').click(function() {
		$(this).fadeOut(2000, function() {
			$(this).fadeIn(2000, function() {
				$(this).css({background : 'url(/images/band_hero2.jpg)', 'background-position' : '50% 10%', 'background-size' : 'cover'});
			});
		});
		console.log('Changed background image');
	});

/*	var band2Image = */

	var onHoverShiftRight = function() {
		$(this).animate({'margin-left' : '100px'});
		console.log("hover action triggered");
	};

	var offHoverShiftLeft = function() {
		$(this).animate({'margin-left' : '0'});
		console.log("Hover off action");
	};

	var onHoverActionHeader = function() {
		$(this).css({color : 'yellow'});
		console.log('Changed h1 colour to yellow');
	};

	var offHoverActionHeader = function() {
		$(this).css({color : '#EB7F00'});
		console.log('h1 reverted to original colour');
	};

	$('.navbar img').hover(onHoverShiftRight, offHoverShiftLeft);
	$('.hero-content h1').hover(onHoverActionHeader, offHoverActionHeader);
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