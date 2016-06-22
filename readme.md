# Scroll smoothy with constant speed

Most smooth-scroll plugins out there are running on a set time. Which sometimes can behave badly if the distance is very short (results in mega slow scroll) or very long (results in mega fast scroll). Smoothy take care of this by running with constant speed.

## Install manually

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

## Release history

- 1.0.0
  - Initial release

## License

The MIT License

Copyright (c) 2016 Mattias Haal

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.