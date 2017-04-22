/**
 * Dependencies:
 * - Panache (v1.0.0)
 * - Smoothy (v1.1.1)
 */

(function () {

	'use strict';

	var App = {

		init: function () {
			this.nav();
		},

		nav: function () {
			var nav = panache('#nav'),
				header = panache('#header');

			// Add the background color to the navbar if the header
			// component is outside the viewport, otherwise remove
			// the background color from the navbar:
			function backgroundColor() {
				if (panache.inview(header, 68)) {
					panache.addClass(nav, 'is-transparent');
				} else {
					panache.removeClass(nav, 'is-transparent');
				}
			};

			// Check the status of the backgroundColor function:
			panache.animate(backgroundColor);

			// Initialize Smoothy:
			smoothy.init({
				easing: 'easeInOutQuad',
				speed: 1500,
				offset: 116
			});
		}

	};

	// Run the scripts of this app when the dom is ready:
	panache.ready(function() {
		App.init();
	});

})();
