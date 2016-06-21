/**
 * Smoothy
 * Written by: Mattias Haal
 * Version: 1.0.0
 * Licence: MIT
 * Requirements: None, it is a framework-free plugin
 * Site: https://github.com/kaloja/smoothy
 * Source: Smoothy is based on https://github.com/GabrielDelepine/smooth-scroll
 */

(function(root) {
	'use strict';
	var fixedHeaderHeight = 50, // If UI using fixed header. Write the height of your header to avoid your target being hidden behind it.
		movingFrequency = 15, // Affect performance.
		links = document.getElementsByTagName('a'),
		href;

	for (var i = 0; i < links.length; i++) {
		href = (links[i].attributes.href === undefined) ? null : links[i].attributes.href.nodeValue.toString();
		if (href !== null && href.length > 1 && href.indexOf('#') != -1) {
			links[i].onclick = function() {
				var element,
					href = this.attributes.href.nodeValue.toString(),
	                url = href.substr(0, href.indexOf('#')),
	                id = href.substr(href.indexOf('#') + 1),
	                speed = 2; // Set 'speed' value in px/ms. Higher number makes the scroll faster. Important notice: Make sure the generated 'time' value is greater than 'movingFrequency'.

	            if (element = document.getElementById(id)) {
	            	var getScrollTopDocumentAtBegin = getScrollTopDocument(),
	            		distance = getScrollTopElement(element) - getScrollTopDocumentAtBegin,
	            		time = Math.abs(distance / speed),
						scrollCount = (time - (movingFrequency % time)) / movingFrequency, // Always make an integer.
	            		distance = (getScrollTopElement(element) - getScrollTopDocumentAtBegin) / scrollCount;

	            	if (window.history && typeof window.history.pushState == 'function') {
	            		window.history.pushState({}, undefined, url + '#' + id); // Change URL for modern browser.
	            	}

	            	for (var i = 1; i <= scrollCount; i++) {
	            		(function() {
                            var scrollPosition = distance * i;
                            setTimeout(function() {
                                window.scrollTo(0, scrollPosition + getScrollTopDocumentAtBegin); 
                            }, movingFrequency * i);
                        })();
	            	}
	            	return false;
	            }
			};
		} 
	}

	var getScrollTopElement = function(e) {
        var top = fixedHeaderHeight * -1;

        while (e.offsetParent != undefined && e.offsetParent != null)
        {
            top += e.offsetTop + (e.clientTop != null ? e.clientTop : 0);
            e = e.offsetParent;
        }

        return top;
    };
    
    var getScrollTopDocument = function() {
        return window.pageYOffset !== undefined ? window.pageYOffset : document.documentElement.scrollTop !== undefined ? document.documentElement.scrollTop : document.body.scrollTop;
    };
})(this);