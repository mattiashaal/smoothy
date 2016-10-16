/**
 * Smoothy
 * Written by: Mattias Haal
 * Version: 1.0.0
 * Licence: MIT
 * Requirements: None, it is a framework-free plugin
 * Site: https://github.com/kaloja/smoothy
 * Smoothy is inspired by:
 * https://github.com/GabrielDelepine/smooth-scroll,
 * http://gizma.com/easing,
 * https://github.com/callmecavs/jump.js
 */

(function (root, factory) {

    root.smoothy = factory();

})(this, function () {

    'use strict';

    var Smoothy = {

        data: {
            fixedHeader: false, // If user interface using fixed header.
            headerHeight: 0, // Set the height of your header to avoid your target being hidden behind it.
            speed: 1000, // Speed set in pixels per second.
            easingType: 'linear' // Choose animation type.
        },

        settings: {},

        init: function () {
            this.extend();
            this.options();
        },

        // @reference: https://gomakethings.com/vanilla-javascript-version-of-jquery-extend/
        extend: function () {
            var extended = {},
                deep = false,
                i = 0,
                length = arguments.length;

            // Check if a deep merge.
            if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
                deep = arguments[0];
                i++;
            };

            // Merge the object into the extended object:
            function merge(obj) {
                for (var prop in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, prop)) {

                        // If deep merge and property is an object, merge properties:
                        if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
                            extended[prop] = extend(true, extended[prop], obj[prop]);
                        } else {
                            extended[prop] = obj[prop];
                        }
                    }
                }
            };

            // Loop through each object and conduct a merge:
            for (; i < length; i++) {
                var obj = arguments[i];
                merge(obj);
            }

            return extended;
        },

        options: function (obj) {
            var data = Smoothy.extend(Smoothy.data, obj);
            Smoothy.settings = data;

            // Init the scroll function:
            this.scroll();
        },

        scroll: function () {
            var links = document.getElementsByTagName('a'),
                speed = Smoothy.settings.speed;

            for (var i = 0; i < links.length; i++) {
                var href = (links[i].attributes.href === undefined) ? null : links[i].attributes.href.value.toString();
                if (href !== null && href.length > 1 && href.indexOf('#') != -1) {

                    links[i].onclick = function () {
                        var href = this.attributes.href.value.toString(),
                            id = href.substr(href.indexOf('#') + 1),
                            lastTime = 0,
                            timeStart,
                            timeElapsed,
                            animateId,
                            element;

                        if (element = document.getElementById(id)) {
                            var start = getScrollTopDocument(),
                                distance = getScrollTopElement(element) - start,
                                duration = Math.abs(distance / speed) * 1000;
                        }

                        window.requestAnimationFrame(function (time) {
                            timeStart = time;
                            animate(time);
                        });

                        function animate(time) {
                            timeElapsed = time - timeStart;
                            window.scrollTo(0, Smoothy.easing(timeElapsed, start, distance, duration));

                            if (timeElapsed < duration) {
                                animateId = window.requestAnimationFrame(animate);
                            } else {
                                end();
                            }
                        };

                        function end() {
                            window.scrollTo(0, start + distance);
                            window.cancelAnimationFrame(animateId);
                        };

                        // Polyfill for 'requestAnimationFrame' and 'cancelAnimationFrame':
                        // @reference: https://gist.github.com/paulirish/1579671
                        if (window.requestAnimationFrame) {
                            window.requestAnimationFrame = function (callback, element) {
                                var currentTime = new Date().getTime(),
                                    timeToCall = Math.max(0, 16 - (currentTime - lastTime));

                                var id = window.setTimeout(function () {
                                    callback(currentTime + timeToCall);
                                }, timeToCall);

                                lastTime = currentTime + timeToCall;
                                return id;
                            };
                        }

                        if (window.cancelAnimationFrame) {
                            window.cancelAnimationFrame = function (id) {
                                clearTimeout(id);
                            };
                        }

                        return false;
                    };
                }
            };

            // Get the distance between the element and top of the page:
            function getScrollTopElement(element) {
                var header,
                    top;

                Smoothy.settings.fixedHeader == true ? header = Smoothy.settings.headerHeight : header = 0;
                top = header * -1;

                while (element.offsetParent != undefined && element.offsetParent != null) {
                    top += element.offsetTop + (element.clientTop != null ? element.clientTop : 0);
                    element = element.offsetParent;
                }

                return top;
            };

            // Get the distance between current document position and top of the page:
            function getScrollTopDocument() {
                return window.pageYOffset !== undefined ? window.pageYOffset : document.documentElement.scrollTop !== undefined ? document.documentElement.scrollTop : document.body.scrollTop;
            };
        },

        easing: function (timeElapsed, start, distance, duration) {
            switch (Smoothy.settings.easingType) {
                case 'linear':
                    return distance * timeElapsed / duration + start;
                    break;
                case 'easeInOutQuad':
                    timeElapsed = timeElapsed / (duration / 2);
                    if (timeElapsed < 1) {
                        return distance / 2 * timeElapsed * timeElapsed + start;
                    } else {
                        timeElapsed--;
                        return -distance / 2 * (timeElapsed * (timeElapsed - 2) - 1) + start;
                    }
                    break;
                case 'easeInOutCubic':
                    timeElapsed = timeElapsed / (duration / 2);
                    if (timeElapsed < 1) {
                        return distance / 2 * timeElapsed * timeElapsed * timeElapsed + start;
                    } else {
                        timeElapsed -= 2;
                        return distance / 2 * (timeElapsed * timeElapsed * timeElapsed + 2) + start;
                    }
                    break;
            }
        }
    }

    document.addEventListener('DOMContentLoaded', Smoothy.init(), false);

    return Smoothy;

});
