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