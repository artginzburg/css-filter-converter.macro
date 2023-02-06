import { createMacro } from 'babel-plugin-macros';
import { ColorToFilterResult } from 'css-filter-converter/lib/shared/types/result';

import { filterMacro } from './filter.macro';

/**
 * Convert basic CSS color formats to CSS filter.
 *
 * This is a wrapper around [`css-filter-converter`](https://npm.im/css-filter-converter), with a few changes:
 *
 * - Only runs once, at build-time.
 * - There's only one exported function that handles HEX, RGB, HSL, and keywords.
 *
 * Live demo: https://cssfilterconverter.com
 *
 * @throws `MacroError` if the provided color could not be parsed.
 *
 * @example
 * const filter = colorToFilter`#377bb3`
 *
 * element.style.filter = filter.color; // brightness(0) saturate(100%) invert(39%) sepia(63%) saturate(480%) hue-rotate(164deg) brightness(100%) contrast(93%)
 *
 * // Also valid:
 * colorToFilter`rgb(106, 161, 225)`
 * colorToFilter`hsl(212deg, 66%, 65%)`
 * colorToFilter`blue`
 */
const colorToFilter = createMacro(filterMacro) as (
  color: TemplateStringsArray,
) => ColorToFilterResult;

export default colorToFilter;
