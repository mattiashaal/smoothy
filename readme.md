# Scroll smoothy with constant speed

Most smooth-scroll plugins out there are running on a set time. Which sometimes can behave badly if the distance is very short (results in mega slow scroll) or very long (results in mega fast scroll). Smoothy take care of this by running with constant speed.

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

- `fixedHeader`
- `headerHeight`
- `speed`
- `easingType`

```html
<script>
    smoothy.options({
        fixedHeader: true,
        headerHeight: 68,
        speed: 2000,
        easingType: 'easeInOutQuad'
    });
</script>
```

### fixedHeader
If user interface using fixed header. Returns `true` or `false`;

### headerHeight
If fixedHeader is set to `true`. Set the height of your header to avoid your target being hidden behind it.

### speed
The default speed, set to `1000`, returns pixels per second.

### easingType
Choose animation type. Available options are: 

- `linear`
- `easeInOutQuad`
- `easeInOutCubic`

## Release history

- 1.0.0
