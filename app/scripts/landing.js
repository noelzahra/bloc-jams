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