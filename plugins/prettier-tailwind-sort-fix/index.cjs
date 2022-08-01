// Original: https://github.com/tailwindlabs/prettier-plugin-tailwindcss/issues/9#issuecomment-1021028722
// Updated: https://github.com/tailwindlabs/prettier-plugin-tailwindcss/issues/9#issuecomment-1157359437

/* eslint-disable @typescript-eslint/no-var-requires */
const tailwindPlugin = require("prettier-plugin-tailwindcss");
const sortImportsPlugin = require("@trivago/prettier-plugin-sort-imports");

module.exports = {
  parsers: {
    typescript: {
      ...tailwindPlugin.parsers.typescript,
      preprocess: sortImportsPlugin.parsers.typescript.preprocess,
    },
  },
  options: {
    ...sortImportsPlugin.options,
  },
};
