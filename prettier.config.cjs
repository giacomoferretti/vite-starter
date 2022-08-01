module.exports = {
  plugins: [require("./plugins/prettier-tailwind-sort-fix/index.cjs")],
  bracketSameLine: true,
  quoteProps: "consistent",
  importOrder: ["^@/(.*)$", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
