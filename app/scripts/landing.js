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

