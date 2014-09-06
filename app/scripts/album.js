/* jQuery effects to album */

/* Cretaing albumPicasso object*/
var albumPicasso = {
	name : 'The Colors',
	artist : 'Pablo Picasso',
	label : 'Cubism',
	year : 1881,
	albumArtUrl ; '/images/album-placeholder.png',
	songs : [
				{ name: 'Blue', length : '4:26' },
				{ name: 'Green', length: '3:14' },
				{ name: 'Red', length : '5:01' },
				{ name: 'Pink', length: '3.21' },
				{ name: 'Magenta', length: '2:15' }
	]
};


/* Creating albummarconi obkject*/
var albumMarconi = {
	name : 'The Telephone',
	artist : 'Guglielmo Marconi',
	label : 'EN',
	year : '1909',
	albumArtUrl : '/images/album-placeholder.png',
	songs : [
				{ name : 'Hello, Operator', length : '1.01' },
				{ name : 'Ring, Ring, Ring', length : '5:01' },
				{ name : 'Fits in your pocket', length : '5.20'},
				{ name : 'Can you hear me' , length : '3:14' },
				{ name : 'Wrong phone numbers', length : '2:15'}
	]
};

 // This 'if' condition is used to prevent the jQuery modifications
 // from happening on non-Album view pages.
 //  - Use a regex to validate that the url has "/album" in its path.

 if (document.URL.match(/\/album.html/)) {
 	// Wait until the HTML is fully processed.
 	$(document).ready(function() {
 		console.log("album.js loaded succesfully")
 	});
 };