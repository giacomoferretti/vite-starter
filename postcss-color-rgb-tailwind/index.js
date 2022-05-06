/**
 * @type {import('postcss').PluginCreator}
 */
const helpers = require("postcss-message-helpers");
const reduceFunctionCall = require("reduce-function-call");

const parseRgbValues = (str) => {
  const values = [];
  let pos = 0;
  let depth = 0;

  str = str.trim();
  str = str.replace(/\s+/g, " ");

  for (let i = 0, length = str.length; i < length; i++) {
    const char = str[i];

    if (char === "(") {
      depth++;
    } else if (char === ")") {
      depth--;
    } else if (!depth && " ,/".indexOf(char) !== -1) {
      if (pos !== i) {
        values.push(str.substring(pos, i));
      }

      pos = i + 1;
    }
  }

  values.push(str.substring(pos));

  return values;
};

module.exports = () => {
  return {
    postcssPlugin: "postcss-color-rgb-tailwind",
    Declaration(decl) {
      if (!decl.value || decl.value.search(/rgb[a]?\(/i) === -1) {
        return;
      }

      decl.value = helpers.try(() => {
        return reduceFunctionCall(decl.value, /(rgb[a]?)\(/, (body, fn) => {
          const values = parseRgbValues(body);

          if (values.length === 4) {
            const alpha = values.pop();
            if (alpha.indexOf("%") === alpha.length - 1) {
              alpha = parseFloat(alpha) / 100;
            }

            values.push(alpha);

            fn = "rgba";
          }

          return fn + "(" + values.join(", ") + ")";
        });
      }, decl.source);
    },
  };
};

module.exports.postcss = true;
