# css-filter-converter.macro

Convert basic CSS color formats to CSS filter.

This is a wrapper around [`css-filter-converter`][css-filter-converter], with a few changes:

- Only runs once, at build-time.
- There's only one exported function that handles HEX, RGB, HSL, and keywords.

Live demo: https://cssfilterconverter.com

Throws `MacroError` if the provided color could not be parsed.

## Prerequisites

- [`babel-plugin-macros`](https://npm.im/babel-plugin-macros)

> Docs: https://github.com/kentcdodds/babel-plugin-macros/blob/main/other/docs/user.md. Also, it comes bundled with Create React App.

## Example usage

```js
const filter = colorToFilter`#377bb3`;

element.style.filter = filter.color;
// brightness(0) saturate(100%)
// invert(39%) sepia(63%) saturate(480%) hue-rotate(164deg) brightness(100%) contrast(93%)

// Also valid:
colorToFilter`rgb(106, 161, 225)`;
colorToFilter`hsl(212deg, 66%, 65%)`;
colorToFilter`blue`;
```

That's all you need to just use it if you already had experience with the utilized technologies or just don't need deeper understanding now.

<br />

## Documentation

The following is the missing documentation of the base package — limitations, explanation, etc.

## Why does this tool exist?

Mostly, to colorize something that can't be colorized via CSS. A good example of that is a JPG or PNG image. Setting `color` only applies to text, and `background-color` obviously applies to the background. `fill` and `stroke` work with SVG images. So none of these would colorize a PNG image.

CSS filters, though, are applied on top of anything, and that's what makes them useful.

## Limitations

### Limitations of this macro

- Does not support converting back from a CSS filter to a color (but it's easy to implement since the base package already does it)

### Limitations of [`css-filter-converter`][css-filter-converter]

- Sometimes the `loss` of the returned CSS filter can be too high. This macro in the future should have an option to retry conversion until `loss` is under `1`.

### Limitations of CSS filters

Precise colorization via filters is a hack. There are some problems that come with it:

#### Animation

- If you ever need to animate the filter (e.g. applying it only when the user hovers an icon), the visual color will not transition directly from e.g. white to blue.

  It will most probably transition through some other colors, like green, yellow, red, or whatever else may the intermediate resulting CSS filter look like.

[css-filter-converter]: https://npm.im/css-filter-converter

## Alternatives

### Convert to SVG

If your raster image is a simple icon, then instead of colorizing it using filters, you might want to convert it to an SVG to have full control over stroke/fill color and other useful properties.

The simplest way to do this:

1. Use [Adobe Express](https://express.adobe.com/tools/convert-to-svg) to Convert your JPG or PNG to an SVG (it's free, unlike most Adobe services)
2. Use [SVGO](https://github.com/svg/svgo), or the web interface for it — [SVGOMG](https://jakearchibald.github.io/svgomg/) to optimize the resulting SVG
