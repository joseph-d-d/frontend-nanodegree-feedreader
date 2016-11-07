/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        //make sure feeds are defined and not empty
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        //make sure feeds urls are defined and not empty
        it('URL defined', function () {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe('');
            }
        });

        //make sure feeds names are defined and not empty
        it('name defined', function () {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBe('');
            }
        })
    });

    describe('The menu', function () {
        //make sure menu is hidden by default
        it('menu hidden by default', function () {
            expect(document.body.className).toContain('menu-hidden');
        });

        //make sure the menu changes
        it('menu changes', function () {
            var menueLink = document.getElementsByClassName('menu-icon-link');
            //click on the menu to unhide it
            menueLink[0].click();
            expect(document.body.className).not.toContain('menu-hidden');
            //click on the menu to make sure it hides again
            menueLink[0].click();
            expect(document.body.className).toContain('menu-hidden');
        });
    });

    describe('Initial Entries', function () {
        beforeEach(function (done) {
            loadFeed(0, done);
        });

        //make sure the feed reader has atleast one or more entries
        it('has one or more entries', function (done) {
            var feed = document.getElementsByClassName('feed');
            expect(feed[0].getElementsByClassName('entry').length).toBeGreaterThan(0);
            done();
        })


    });

    describe('New Feed Selection', function () {
        var firstFeedContent;
        var secondFeedContent;

        beforeEach(function (done) {
            //load the first feed
            loadFeed(0, function () {
                // callback for load feed then gets the first entry href
                var feed = document.getElementsByClassName('feed');
                firstFeedContent = feed[0].children[0].href;
                //then calls the next loadFeed so after the first feed is done it will load the second feed
                loadFeed(1, function () {
                    feed = document.getElementsByClassName('feed');
                    secondFeedContent = feed[0].children[0].href;
                    //reset the feed to original value
                    loadFeed(0);
                    done()
                });
            })
        });

        it('feeds change', function (done) {
            expect(firstFeedContent).not.toEqual(secondFeedContent);
            done();
        })
    });

}());
