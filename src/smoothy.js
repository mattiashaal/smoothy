(function (window, factory) {

	window.smoothy = factory();

})(window, function () {

	let callback,
		currentTime,
		distance,
		duration,
		element,
		href,
		item,
		linkId,
		links,
		offset,
		renderId,
		speed,
		start,
		startTime,
		time;

	// Merge objects and return a new object:
	function extend () {
		for (var i = 1; i < arguments.length; i++) {
			for (var key in arguments[i]) {
				if (arguments[i].hasOwnProperty(key)) {
					arguments[0][key] = arguments[i][key];
				}
			}
		}

		return arguments[0];
	};

	// A collection of easing patterns:
	function easing (time, start, distance, duration) {
		switch (SMOOTHY.settings.easing) {
		case 'linear':
			return distance * time / duration + start;
			break;

		case 'easeInOutQuad':
			time = time / (duration / 2);
			if (time < 1) {
				return distance / 2 * time * time + start;
			} else {
				time--;
				return -distance / 2 * (time * (time - 2) - 1) + start;
			}
			break;

		case 'easeInOutCubic':
			time = time / (duration / 2);
			if (time < 1) {
				return distance / 2 * time * time * time + start;
			} else {
				time -= 2;
				return distance / 2 * (time * time * time + 2) + start;
			}
			break;
		}
	};

	// Get the distance between the element and top of the page:
	function topElement (element) {
		offset = SMOOTHY.settings.offset * -1;

		while (element.offsetParent != undefined && element.offsetParent != null) {
			offset += element.offsetTop + (element.clientTop != null ? element.clientTop : 0);
			element = element.offsetParent;
		}

		return offset;
	};

	// Get the distance between current document position and top of the page:
	function topDocument () {
		return window.pageYOffset !== undefined ? window.pageYOffset : document.documentElement.scrollTop !== undefined ? document.documentElement.scrollTop : document.body.scrollTop;
	};

	const SMOOTHY = {};

	SMOOTHY.settings = {
		animate: true, // true | false
		callback: undefined,
		easing: 'linear', // linear | easeInOutQuad | easeInOutCubic
		offset: 0,
		speed: 1000,
		time: 500,
		type: 'speed' // speed | time
	};

	SMOOTHY.init = (settings) => {
		SMOOTHY.settings = extend(SMOOTHY.settings, settings);

		// Init the scroll function:
		SMOOTHY.scroll();
	};

	SMOOTHY.scroll = () => {
		if (SMOOTHY.settings.animate == true) {
			links = document.getElementsByTagName('a');
			speed = SMOOTHY.settings.speed;
			time = SMOOTHY.settings.time;

			for (var i = 0; i < links.length; i++) {
				href = (links[i].attributes.href === undefined) ? null : links[i].attributes.href.value.toString();
				if (href !== null && href.length > 1 && href.indexOf('#') != -1) {

					links[i].addEventListener('click', function() {
						linkId = this.attributes.href.value.toString().substr(href.indexOf('#') + 1);

						if (element = document.getElementById(linkId)) {
							start = topDocument();
							distance = topElement(element) - start;

							if (SMOOTHY.settings.type === 'speed') {
								duration = Math.abs(distance / speed) * 1000;
							} else if (SMOOTHY.settings.type === 'time') {
								duration = time;
							}
						}

						window.requestAnimationFrame(function (timestamp) {
							startTime = timestamp;
							render(timestamp);
						});

						function render (timestamp) {
							currentTime = timestamp - startTime;
							window.scrollTo(0, easing(currentTime, start, distance, duration));

							if (currentTime < duration) {
								renderId = window.requestAnimationFrame(render);
							} else {
								done();
							}
						};

						function done () {
							window.scrollTo(0, start + distance);
							window.cancelAnimationFrame(renderId);

							// If it exists, run the callback:
							if (typeof SMOOTHY.settings.callback === 'function') {
								SMOOTHY.settings.callback();
							}
						};

						// Polyfill for requestAnimationFrame:
						if (!window.requestAnimationFrame) {
							window.requestAnimationFrame = function (callback) {
								setTimeout(callback, 1000 / 60);
							};
						}

						// Polyfill for cancelAnimationFrame:
						if (!window.cancelAnimationFrame) {
							window.cancelAnimationFrame = function (id) {
								clearTimeout(id);
							};
						}
					}, false);

				}
			}
		}
	};

	return SMOOTHY;

});
