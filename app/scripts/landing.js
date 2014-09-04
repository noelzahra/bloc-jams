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