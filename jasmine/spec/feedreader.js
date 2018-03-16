/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

$(function() {

    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */

    describe('RSS Feeds', function() {

        /* Make sure that the allFeeds variable has been defined
         * and that it is not empty.
         */

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Ensure every feed has a URL defined
         * and that the URL is not empty.
         */

         it('URL is not empty', function() {
             allFeeds.forEach(function(feed) {
                 expect(feed.url).toBeDefined();
                 expect(feed.url.length).not.toBe(0);
             });
         });

        /* Ensure each feed has a name defined
         * and that the name is not empty.
         */
         it('name is not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
           });
         });

    });

    // Test the Menu

    describe('The menu', function() {

        /* Ensure the menu element is hidden by default.
         */

         it('is hidden by default', function() {
              expect($('body').hasClass('menu-hidden')).toBe(true);
         });

         /* Ensures the menu changes visibility when the menu icon is clicked.
          */

          it('changes visibility when the menu icon is clicked', function() {
              // does the menu display when clicked
              // does the menu hide when clicked again
              $('.menu-icon-link').click();
              expect($('body').hasClass('menu-hidden')).toBe(false);

              $('.menu-icon-link').click();
              expect($('body').hasClass('menu-hidden')).toBe(true);

          });

    });

    // Test the Initial Entries

    describe('Initial Entries', function() {

        /* Ensure when the loadFeed function is called and completes its work,
         * there is at least a single .entry element within the .feed container
         */

         beforeEach(function(done) {
              loadFeed(0, done);
         });

         it('are at least one (there is at least a single .entry element within the .feed container)', function() {
              expect($('.feed .entry').length).toBeGreaterThan(0);
         });

    });

    // Test the New Feed Selection

    describe('New Feed Selection', function() {

        /* Ensure when a new feed is loaded by the loadFeed function
         * that the content actually changes.
         */

         let contentBefore;
         let contentAfter;

         beforeEach(function(done) {
              loadFeed(0, function(){
                  contentBefore = $(".feed").text();
                  loadFeed(1, function(){
                      contentAfter = $(".feed").text();
                      done();
                  });
              });
         });

         it('loads (the content actually changes by the loadFeed function)', function() {
              expect(contentBefore).not.toEqual(contentAfter);
         });

    });

}());
