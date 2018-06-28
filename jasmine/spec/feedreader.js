/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* All tests are placed within the $() function to make sure they
 * don't run until the DOM is ready, since some of these tests
 * may require DOM elements.
 */


/* This test suite is all about the RSS feeds definitions,
 * the allFeeds variable in the application.
 */
$(function() {
	describe('RSS Feeds', function() {

		/* This test checks that the allFeeds variable has been defined
     * and that it is not empty.
     */
		it('are defined', function() {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});

		/* This test loops through each feed in the allFeeds object
     * and ensures they all have a URL defined and not empty.
     */
		it('all have a URL defined and not empty', function() {
			for (var i = 0; i < allFeeds.length; i++) {
				expect(allFeeds[i].url).toBeDefined();
				expect(allFeeds[i].url.length).not.toBe(0);
			}
		});

		/* This test loops through each feed in the allFeeds object
     * and ensures they all have a name defined and not empty.
     */
		it('all have a name defined and not empty', function() {
			for (var i = 0; i < allFeeds.length; i++) {
				expect(allFeeds[i].name).toBeDefined();
				expect(allFeeds[i].name.length).not.toBe(0);
			}
		});

	});


	/* This test suite checks the menu functionality
	 * (it should be hidden by default and it should open/close
	 * by clicking a button).
	 */
	describe('The menu', function() {
		var body = $('body'),
			menuIcon = $('.menu-icon-link');

		/* This test ensures the menu element is hidden by default.
		 */
		it('should not be visible by default', function() {
			expect(body.hasClass('menu-hidden')).toBeTruthy();
		});

		/* This test ensures that the menu changes visibility when
		 * the menu icon is clicked: it is displayed when the button is clicked
		 * the first time, and it is hidden when the button is clicked again.
		 */
		it('changes visibility when the menu icon is clicked', function() {
			// First click -- menu is open
			menuIcon.trigger('click');
			expect(body.hasClass('menu-hidden')).toBeFalsy();
			// Second click -- menu is close
			menuIcon.trigger('click');
			expect(body.hasClass('menu-hidden')).toBeTruthy();
		});

	});


	/* This test suite ensures that when the loadFeed function is called and
	 * completes its work, there is at least a single .entry element within
	 * the .feed container
	 */
	describe('Initial Entries', function() {

		/* Since loadFeed() is asynchronous, it's necessary to use
		 * Jasmine's beforeEach and asynchronous done() function.
		 */
		beforeEach(function(done) {
			loadFeed(0, function() {
				done();
			});
		});

		it('there is at least one entry when loadFeed is called and complete.', function(done) {
			expect($('.feed').find($('.entry'))).toBeTruthy();
			done();
		});

	});


	/* This test suite ensures that when a new feed is loaded by the loadFeed
	 * function, the content of the .feed container changes.
	 */
	describe('New Feed Selection', function() {
		var feed_0,
			feed_1;

		/* Again, since loadFeed() is asynchronous, beforeEach and done()
		 * function are used. First of all, it is necessary to make sure that
		 * the feed is empty. Then, the loadFeed function is called twice and
		 * loads a different feed each time. To compare the two feeds and
		 * make sure their content is different, the html values are stored
		 * in two variable previously defined.
		 */
		beforeEach(function(done) {
			// Empty the feed
			$('.feed').empty();
			// First feed is loaded
			loadFeed(0, function() {
				feed_0 = $('.feed').html();
			});
			// Second feed is loaded
			loadFeed(1, function() {
				feed_1 = $('.feed').html();
				done();
			});
		});

		it('when a new feed is loaded, the content changes', function(done) {
			expect(feed_0).not.toEqual(feed_1);
			done();
		});
		
	});

}());
