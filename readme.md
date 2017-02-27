# Scroll smoothy with average speed or a set time

Most smooth-scroll plugins out there are running on a set time. Which sometimes can behave badly if the distance is very short (results in mega slow scroll) or very long (results in mega fast scroll). Smoothy take care of this by having settings for average speed and set time. Select scroll type after your needs.

## Install

Use the compiled file in the `dist` folder. Ensure you place the script file
before the closing `</body>` tag.

```html
<html>
    <head>
        <title>Smoothy</title>
    </head>
    <body>
        <nav>
            <a href="#id">
                <!-- link to target using hash anchor and id -->
            </a>
        </nav>
        <div id="id">
            <!-- target element -->
        </div>
        <script src="dist/smoothy.min.js"></script>
    </body>
</html>
```

## Options

Customize Smoothy for your needs. Available options are: 

- `animate`
- `easing`
- `offset`
- `speed`
- `time`
- `type`

```html
<script>
    smoothy.init({
        offset: 80,
        speed: 2000,
        easing: 'easeInOutQuad'
    });
</script>
```
#### animate
Option to turn on/off the scroll animation.  

Options: `true | false`
Default: `true`

#### easing
A collection of easing patterns to choose from. 

Options: `linear | easeInOutQuad | easeInOutCubic`
Default: `linear`

#### offset
Option to offset where the animation ends. If the user interface using a fixed header you can offset the headers height to avoid your target being hidden behind it.

Default: `0`

#### speed
Defines the average speed. Speed returns pixels per second.

Default: `1000`

#### time
Defines the animation time.

Default: `500`

#### type
Speed is the default animation type for Smoothy. 

Options: `speed | time`
Default: `speed`

## Release history

- 1.0.0
