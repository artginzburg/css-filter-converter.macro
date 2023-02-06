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

element.style.filter = filter.color; // brightness(0) saturate(100%) invert(39%) sepia(63%) saturate(480%) hue-rotate(164deg) brightness(100%) contrast(93%)

// Also valid:
colorToFilter`rgb(106, 161, 225)`;
colorToFilter`hsl(212deg, 66%, 65%)`;
colorToFilter`blue`;
```

## Limitations of this macro

- Does not support converting back from a CSS filter to a color (not for long, though)

### Limitations of [`css-filter-converter`][css-filter-converter]

- Sometimes the `loss` of the returned CSS filter can be too high. This macro in the future should have an option to retry conversion until `loss` is under `1`.

[css-filter-converter]: https://npm.im/css-filter-converter
