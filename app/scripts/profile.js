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