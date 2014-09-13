/* jQuery for profile page */

var tabsContainer = ".user-profile-tabs-container";

var selectTabHandler = function(event) {
	$tab = $(this);
	$(tabsContainer + " li").removeClass('active');
	$tab.parent().addClass('active');

	var selectedTabName = $tab.attr('href');
	console.log(selectedTabName);

	$(".tab-pane").addClass('hidden'); //bootstrap class => display: none;
	$(selectedTabName).removeClass('hidden');
	event.preventDefault();
};

if (document.URL.match(/\/profile.html/)) {
	$(document).ready(function() {
		var $tabs = $(tabsContainer + " a");
		$tabs.click(selectTabHandler);
		$tabs[0].click();
	});
}