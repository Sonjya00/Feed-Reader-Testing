/*eslint-disable no-undef*/

/* app.js
 *
 * This is the RSS feed reader application. It uses the Google
 * Feed Reader API to grab RSS feeds as JSON object.
 * It also uses the Handlebars templating library and jQuery.
 */

// The names and URLs to all of the available feeds.
var allFeeds = [
	{
		name: 'Udacity Blog',
		url: 'http://blog.udacity.com/feed'
	}, {
		name: 'CSS Tricks',
		url: 'http://feeds.feedburner.com/CssTricks'
	}, {
		name: 'HTML5 Rocks',
		url: 'http://feeds.feedburner.com/html5rocks'
	}, {
		name: 'Linear Digressions',
		url: 'http://feeds.feedburner.com/udacity-linear-digressions'
	}
];

/* This function starts up the application. The Google Feed Reader API
 * is loaded asynchronously and will then call this function when
 * the API is loaded.
 */
function init() {
	// Load the first feed defined on allFeeds (index of 0).
	loadFeed(0);
}

/* This function performs everything necessary to load a feed
 * using the Google Feed Reader API. It will then perform all of the
 * DOM operations required to display feed entries on the page.
 * Feeds are referenced by their index position within the allFeeds array.
 * This function supports a callback as its second parameter, which
 * is called after everything has run successfully.
 */
function loadFeed(id, cb) {
	var feedUrl = allFeeds[id].url,
		feedName = allFeeds[id].name;

	$.ajax({
		type: 'POST',
		url: 'https://rsstojson.udacity.com/parseFeed',
		data: JSON.stringify({url: feedUrl}),
		contentType:'application/json',
		success: function (result, status){

			var container = $('.feed'),
				title = $('.header-title'),
				entries = result.feed.entries,
				entriesLen = entries.length,
				entryTemplate = Handlebars.compile($('.tpl-entry').html());

			title.html(feedName);   // Set the header text
			container.empty();      // Empty all the previous entries

			/* Loop through the entries just loaded via the Google Feed Reader API.
        * The entries are then parsed against the entryTemplate
        * (created above using Handlebars). The resulting HTML is appended
        * to the list of entries on the page.
        */
			entries.forEach(function(entry) {
				container.append(entryTemplate(entry));
			});

			if (cb) {
				cb();
			}
		},
		error: function (result, status, err){
			//run only the callback without attempting to parse result due to error
			if (cb) {
				cb();
			}
		},
		dataType: 'json'
	});
}

/* Google API: Loads the Feed Reader API and defines what function
 * to call when the Feed Reader API is done loading.
 */
google.setOnLoadCallback(init);

/* All of this functionality relies heavily on the DOM, so the code is placed
 * in the $() function to ensure it doesn't execute until the DOM is ready.
 */
$(function() {
	var container = $('.feed'),
		feedList = $('.feed-list'),
		feedItemTemplate = Handlebars.compile($('.tpl-feed-list-item').html()),
		feedId = 0,
		menuIcon = $('.menu-icon-link');

	/* Loop through all of the feeds, assigning an id property to
   * each of them based on their index within the array.
   * Then parse that feed against the feedItemTemplate (created
   * above using Handlebars) and append it to the list of all
   * available feeds within the menu.
   */
	allFeeds.forEach(function(feed) {
		feed.id = feedId;
		feedList.append(feedItemTemplate(feed));

		feedId++;
	});

	/* When a link in the feedList is clicked, the menu is hidden, the feed is
   * loaded, and the default action is prevented (following the link)
   * from occurring.
   */
	feedList.on('click', 'a', function() {
		var item = $(this);

		$('body').addClass('menu-hidden');
		loadFeed(item.data('id'));
		return false;
	});

	/* When the menu icon is clicked on, the class 'menu-hidden' is toggled
   * on the body to perform the hiding/showing of the menu.
   */
	menuIcon.on('click', function() {
		$('body').toggleClass('menu-hidden');
	});
}());
