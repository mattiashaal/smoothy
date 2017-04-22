# Smoothy

Most smooth-scroll plugins out there are running on a set time. Which sometimes can behave badly if the distance is very short, results in mega slow scroll, or very long, results in mega fast scroll. Smoothy takes care of this by having settings for average speed and set time. Select animation type after your needs.

## Getting Started

1. [Install](#install)
2. [Include script](#include-script)
3. [Include markup](#include-markup)
4. [Settings](#settings)
5. [Demo](https://kaloja.github.io/smoothy/)

## Install

```sh
# via bower:
$ bower install smoothy

# via npm:
$ npm install smoothy

# via git clone:
$ git clone https://github.com/kaloja/smoothy
```

## Include script

Ensure you're using the file in the `dist` directory, which contains compiled production-ready code. Place the script before the closing `</body>` tag. The `src` directory contains development code.

```html
<script src="dist/smoothy.min.js"></script>
```

## Include markup

```html
<a href="#id"><!-- Link to target --></a>
...
<div id="id"><!-- Target element --></div>
```

## Initialize Smoothy

Ensure you initialize Smoothy after its script file.

```html
<script>
	smoothy.init();
</script>
```

## Settings

Smoothy works right out of the box. But you can customize it after your needs, using its API. You can pass your settings and callbacks into Smoothy through the `init()` function.

```js
smoothy.init({
	easing: 'easeInOutQuad',
	offset: 80,
	speed: 2000,
	callback: function() {
		console.log('Smoothy scroll animation is done');
	}
});
```

#### animate

Option to turn on or off the scroll animation.

`options: true | false => default: true`

#### callback

Add a function that will be called when the scroll animation has been completed.

`options: function | undefined => default: undefined`

```js
smoothy.init({
	callback: function() {
		console.log('Smoothy scroll animation is done');
	}
});
```

#### easing

A collection of easing patterns to choose from.

`options: linear | easeInOutQuad | easeInOutCubic => default: linear`

#### offset

Option to offset where the animation ends. If the user interface using a fixed header you can offset the headers height to avoid your target being hidden behind it.

`default: 0`

#### speed

Defines the average speed. Speed returns pixels per second.

`default: 1000`

#### time

Defines the animation time.

`default: 500`

#### type

Speed is the default animation type for Smoothy.

`options: speed | time => default: speed`
