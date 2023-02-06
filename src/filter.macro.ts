import { MacroError } from 'babel-plugin-macros';
import { MacroParams } from 'babel-plugin-macros';
import CssFilterConverter from 'css-filter-converter';

export function filterMacro({ references, babel }: MacroParams) {
  references.default.forEach((referencePath) => {
    const quasiPath = referencePath.parentPath?.get('quasi');

    if (Array.isArray(quasiPath)) return;
    if (!quasiPath?.parentPath) return;

    const quasiQuasiPath = quasiPath.parentPath.get('quasi');

    if (Array.isArray(quasiQuasiPath)) return;

    const valueString = quasiQuasiPath.evaluate().value;
    const value = evaluate(valueString);
    const valueNode = valueToASTNode(value, babel);

    if (valueNode === undefined || valueNode === null) return;

    quasiPath.parentPath.replaceWith(valueNode);
  });
}

function evaluate(value: string) {
  const filter = colorToFilter(value);
  if (filter.error) {
    throw new MacroError(filter.error.message);
  }
  return filter;
}

function colorToFilter(color: string) {
  if (color.includes('#')) {
    return CssFilterConverter.hexToFilter(color);
  }
  if (color.includes('rgb')) {
    return CssFilterConverter.rgbToFilter(color);
  }
  if (color.includes('hsl')) {
    return CssFilterConverter.hslToFilter(color);
  }
  return CssFilterConverter.keywordToFilter(color);
}

function valueToASTNode(value: unknown, babel: MacroParams['babel']) {
  const fileNode = babel.parse(`var x = ${JSON.stringify(value)}`);
  const bodyElement = fileNode?.program.body[0];
  if (bodyElement === undefined) return;
  if (!('declarations' in bodyElement)) return;
  return bodyElement.declarations[0].init;
}
