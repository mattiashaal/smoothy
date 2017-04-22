"use strict";

/*! Smoothy docs | v1.0.0 | @kaloja */
/* panache v1.0.0 | © 2017 @kaloja | https://github.com/kaloja/panache.git */
!function (e, t) {
	e.panache = e.$ = t();
}(window, function () {
	"use strict";
	var e = {};return e = function e(_e, t) {
		var n = /^\#[\w\-]+$/,
		    o = /^\.[\w\-]+$/,
		    i = /^\w+$/;return t ? n.test(_e) ? t.getElementById(_e.substr(1)) : o.test(_e) ? t.getElementsByClassName(_e.substr(1)) : i.test(_e) ? t.getElementsByTagName(_e) : t.querySelectorAll(_e) : n.test(_e) ? document.getElementById(_e.substr(1)) : o.test(_e) ? document.getElementsByClassName(_e.substr(1)) : i.test(_e) ? document.getElementsByTagName(_e) : document.querySelectorAll(_e);
	}, e.addClass = function (t, n) {
		e.forEach(n, function (n) {
			document.documentElement.classList ? e.hasClass(t, n) || t.classList.add(n) : e.hasClass(t, n) || (t.className += (t.className ? " " : "") + n);
		});
	}, e.after = function (e, t) {
		"string" == typeof t ? e.insertAdjacentHTML("afterend", t) : t instanceof Node && e.parentNode.insertBefore(t, e.nextSibling);
	}, e.ajax = function (e, t, n, o, i) {
		var n = n || "GET",
		    o = o || !0,
		    r = null;r = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP"), r.onreadystatechange = function () {
			if (4 == r.readyState || "complete" == r.readyState) {
				if (200 != r.status) return void console.log("Something went wrong with the server request.");t(r);
			}
		}, r.open(n, e, o), i && r.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), r.send(i);
	}, e.animate = function (t) {
		function n() {
			r || (i(o), r = !0);
		}function o() {
			r && t(), r = !1;
		}var i = window.requestAnimationFrame,
		    r = !1;e.on("scroll", window, n), window.requestAnimationFrame || (window.requestAnimationFrame = function (e) {
			setTimeout(e, 1e3 / 60);
		});
	}, e.append = function (e, t) {
		return "string" == typeof t ? e.insertAdjacentHTML("beforeend", t) : t instanceof Node ? e.appendChild(t) : void 0;
	}, e.attr = function (t, n, o) {
		return "string" == typeof n && "undefined" == typeof o ? t.getAttribute(n) : t.length > 0 ? e.each(t, function (e) {
			t[e].setAttribute(n, o);
		}) : t.setAttribute(n, o);
	}, e.before = function (e, t) {
		return "string" == typeof t ? e.insertAdjacentHTML("beforebegin", t) : t instanceof Node ? e.parentNode.insertBefore(t, e) : void 0;
	}, e.clone = function (e) {
		return e.cloneNode(!0);
	}, e.each = function (e, t) {
		for (var n = 0; n < e.length; n++) {
			t.call(e[n], n);
		}
	}, e.empty = function (t) {
		return t.length > 0 ? e.each(t, function (e) {
			return t[e].innerHTML = "";
		}) : t.innerHTML = "";
	}, e.fade = function (t, n) {
		var o = 1 + -n * e.scrollPosition() / 100;t.style.opacity = o, o <= 0 ? t.style.visibility = "hidden" : t.style.visibility = "visible";
	}, e.hasClass = function (e, t) {
		return document.documentElement.classList ? e.classList.contains(t) : e.className = e.className.replace(new RegExp("(^|\\s)*" + t + "(\\s|$)*", "g"), "");
	}, e.hide = function (t) {
		return t.length > 0 ? e.each(t, function (e) {
			t[e].style.display = "none";
		}) : t.style.display = "none";
	}, e.inview = function (e, t) {
		var t = t || 0,
		    n = e.getBoundingClientRect();return n.top <= (window.innerHeight || document.documentElement.clientHeight) && n.bottom >= t;
	}, e.last = function (e) {
		return e[e.length - 1];
	}, e.move = function (t, n, o) {
		function i(e, t) {
			var n = t * (100 * (1 - e));return Math.round(n);
		}function r() {
			var t = a;return a = void 0 !== window.pageYOffset ? window.pageYOffset : e.scrollPosition(), t !== a;
		}var o = o || !1,
		    n = n || -2,
		    s = 0,
		    a = 0,
		    c = 0,
		    l = 0,
		    u = 0,
		    d = 0,
		    f = function f(e, t, n) {
			return e <= t ? t : e >= n ? n : e;
		};n = f(n, -5, 10), o && (a = void 0 !== window.pageYOffset ? window.pageYOffset : e.scrollPosition()), l = a + t.getBoundingClientRect().top, u = t.clientHeight || t.offsetHeight || t.scrollHeight, c = window.innerHeight, d = o ? .5 : (a - l + c) / (u + c);var m = i(d, n);r(), d = (a - l + c) / (u + c), s = i(d, n) - m;var g = "translate3d(0, " + s + "px, 0)";t.style.transform = g;
	}, e.on = function (e, t, n) {
		document.addEventListener ? t.addEventListener(e, n, !1) : document.attachEvent && t.attachEvent("on" + e, n);
	}, e.parent = function (t) {
		return t.length > 0 ? e.each(t, function (e) {
			t[e].parentNode;
		}) : t.parentNode;
	}, e.prepend = function (e, t) {
		return "string" == typeof t ? e.insertAdjacentHTML("afterbegin", t) : t instanceof Node ? e.insertBefore(t, e.firstChild) : void 0;
	}, e.ready = function (e) {
		if ("function" == typeof e) return "complete" === document.readyState ? e() : void document.addEventListener("DOMContentLoaded", e, !1);
	}, e.remove = function (t) {
		return t.length > 0 ? e.each(t, function (e) {
			t[e].parentNode && t[e].parentNode.removeChild(t[e]);
		}) : t.parentNode.removeChild(t);
	}, e.removeClass = function (t, n) {
		e.forEach(n, function (n) {
			document.documentElement.classList ? e.hasClass(t, n) && t.classList.remove(n) : e.hasClass(t, n) && (t.className = t.className.replace(new RegExp("(^|\\s)*" + n + "(\\s|$)*", "g"), ""));
		});
	}, e.rotate = function (t, n) {
		var o = "rotate(" + e.scrollPosition() * n + "deg)";t.style.transform = o;
	}, e.scale = function (t, n) {
		var o = "scale(" + (1 + n * e.scrollPosition() / 100) + ")";t.style.transform = o;
	}, e.scrollPosition = function () {
		return 0 == document.documentElement.scrollTop ? document.body.scrollTop : document.documentElement.scrollTop;
	}, e.scrollValue = function () {
		var e = window.pageYOffset,
		    t = document.body.scrollHeight,
		    n = window.innerHeight,
		    o = e / (t - n) * 100;return o;
	}, e.show = function (t) {
		return t.length > 0 ? e.each(t, function (e) {
			t[e].style.display = "";
		}) : t.style.display = "";
	}, e.siblings = function (e) {
		return Array.prototype.filter.call(e.parentNode.children, function (t) {
			return t !== e;
		});
	}, e.toggleClass = function (t, n) {
		e.forEach(n, function (n) {
			document.documentElement.classList ? t.classList.toggle(n) : e.hasClass(t, n) ? e.removeClass(t, n) : e.addClass(t, n);
		});
	}, e.forEach = function (e, t) {
		"[object Array]" !== Object.prototype.toString.call(e) && (e = e.split(" "));for (var n = 0; n < e.length; n++) {
			t(e[n], n);
		}
	}, e;
});

/*! Smoothy | v1.1.2 | @kaloja */
"use strict";!function (t, e) {
	t.smoothy = e();
}(window, function () {
	function t() {
		for (var t = 1; t < arguments.length; t++) {
			for (var e in arguments[t]) {
				arguments[t].hasOwnProperty(e) && (arguments[0][e] = arguments[t][e]);
			}
		}return arguments[0];
	}function e(t, e, n, i) {
		switch (g.settings.easing) {case "linear":
				return n * t / i + e;case "easeInOutQuad":
				return t /= i / 2, t < 1 ? n / 2 * t * t + e : (t--, -n / 2 * (t * (t - 2) - 1) + e);case "easeInOutCubic":
				return t /= i / 2, t < 1 ? n / 2 * t * t * t + e : (t -= 2, n / 2 * (t * t * t + 2) + e);}
	}function n(t) {
		for (d = g.settings.offset * -1; void 0 != t.offsetParent && null != t.offsetParent;) {
			d += t.offsetTop + (null != t.clientTop ? t.clientTop : 0), t = t.offsetParent;
		}return d;
	}function i() {
		return void 0 !== window.pageYOffset ? window.pageYOffset : void 0 !== document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
	}var o = void 0,
	    s = void 0,
	    a = void 0,
	    r = void 0,
	    c = void 0,
	    u = void 0,
	    d = void 0,
	    l = void 0,
	    f = void 0,
	    m = void 0,
	    w = void 0,
	    v = void 0,
	    g = {};return g.settings = { animate: !0, callback: void 0, easing: "linear", offset: 0, speed: 1e3, time: 500, type: "speed" }, g.init = function (e) {
		g.settings = t(g.settings, e), g.scroll();
	}, g.scroll = function () {
		if (1 == g.settings.animate) {
			u = document.getElementsByTagName("a"), f = g.settings.speed, v = g.settings.time;for (var t = 0; t < u.length; t++) {
				c = void 0 === u[t].attributes.href ? null : u[t].attributes.href.value.toString(), null !== c && c.length > 1 && c.indexOf("#") != -1 && u[t].addEventListener("click", function () {
					function t(n) {
						o = n - w, window.scrollTo(0, e(o, m, s, a)), o < a ? l = window.requestAnimationFrame(t) : c();
					}function c() {
						window.scrollTo(0, m + s), window.cancelAnimationFrame(l), "function" == typeof g.settings.callback && g.settings.callback();
					}var u = this.attributes.href.value.toString(),
					    d = u.substr(u.indexOf("#") + 1);(r = document.getElementById(d)) && (m = i(), s = n(r) - m, "speed" === g.settings.type ? a = 1e3 * Math.abs(s / f) : "time" === g.settings.type && (a = v)), window.requestAnimationFrame(function (e) {
						w = e, t(e);
					}), window.requestAnimationFrame || (window.requestAnimationFrame = function (t) {
						setTimeout(t, 1e3 / 60);
					}), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (t) {
						clearTimeout(t);
					});
				}, !1);
			}
		}
	}, g;
});

/**
 * Dependencies:
 * - Panache (v1.0.0)
 * - Smoothy (v1.1.1)
 */

(function () {

	'use strict';

	var App = {

		init: function init() {
			this.nav();
		},

		nav: function nav() {
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
	panache.ready(function () {
		App.init();
	});
})();