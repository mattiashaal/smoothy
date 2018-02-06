(function (root) {

  'use strict';

  const SMOOTHY = {};

  SMOOTHY.init = (options = {}) => {
    // Use options or the defaults:
    const callback = options.callback;
    const easing = options.easing || 'linear';
    const offset = options.offset || 0;
    const speed = options.speed || 1000;
    const time = options.time || 500;
    const type = options.type || 'speed';

    // API:
    const settings = {
      callback: callback,
      easing: easing,
      offset: offset,
      speed: speed,
      time: time,
      type: type
    };

    // Init the scroll function:
    SMOOTHY.scroll(settings);
  };

  SMOOTHY.scroll = (settings) => {
    // Private variable cache:
    let distance;
    let duration;
    let elapsedTime;
    let element;
    let elementId;
    let link;
    let next;
    let start;
    let startTime;
    let stop;

    delegate(function (event) {
      if (!linkInPage(event.target)) {
        return;
      } else {
        event.preventDefault();
        event.stopPropagation();

        // Get element id:
        link = event.target.attributes.href.value.toString();
        elementId = link.substr(link.lastIndexOf('#') + 1);

        // Get values for the next scroll:
        if (element = document.getElementById(elementId)) {
          start = pageOffset();
          stop = top(element, start);
          distance = stop - start - settings.offset;

          if (settings.type === 'speed') {
            duration = Math.abs(distance / settings.speed) * 1000;
          } else if (settings.type === 'time') {
            duration = time;
          }
        }

        // Start render:
        window.requestAnimationFrame(function (currentTime) {
          startTime = currentTime;
          render(currentTime);
        });
      }
    });

    // rAF render helper:
    function render (currentTime) {
      // Store time scroll started, if not started already:
      if (!startTime) {
        startTime = currentTime;
      }

      // Determine time spent scrolling so far:
      elapsedTime = currentTime - startTime;

      // Calculate next scroll position:
      next = easing(elapsedTime, start, distance, duration, settings);

      // Scroll to it:
      window.scrollTo(0, next);

      // Check progress:
      elapsedTime < duration
        ? window.requestAnimationFrame(render)
        : done(start, startTime, distance, settings);
    };

    // Scroll finished helper:
    function done (start, startTime, distance, settings) {
      window.scrollTo(0, start + distance);

      // If it exists, run the callback:
      if (typeof settings.callback === 'function') {
        settings.callback();
      }

      // Reset time for next render:
      startTime = false;
    };
  };

  // Get page offset position:
  function pageOffset () {
    return window.scrollY || window.pageYOffset;
  };

  // Get element offset:
  function top (element, start) {
    return element.getBoundingClientRect().top + start;
  };

  // Internal page link check:
  function linkInPage (link) {
    const pageUrl = location.hash
      ? stripHash(location.href)
      : location.href;

    return link.tagName.toLowerCase() === 'a'
      && link.hash.length > 0
      && stripHash(link.href) === pageUrl;
  }

  // Remove the hash and the trailing content from the url:
  function stripHash (url) {
    return url.slice(0, url.lastIndexOf('#'));
  }

  // Delegate the event handler if the selector match the event target:
  function delegate (handler) {
    document.body.addEventListener('click', dispatchEvent, false);

    function dispatchEvent (event) {
      const target = event.target;
      const items = document.body.querySelectorAll('a');

      // Check if target is in the items array and return its index:
      const hasMatch = Array.prototype.indexOf.call(items, target) >= 0;

      // If target has a match in the array, run the handler function:
      if (hasMatch) {
        handler.call(target, event);
      }
    };
  };

  // A collection of easing patterns:
  function easing (time, start, distance, duration, settings) {
    switch (settings.easing) {
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

  // Expose smoothy for the global scope:
  root.smoothy = SMOOTHY;

})(window);
