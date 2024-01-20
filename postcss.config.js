/* eslint-disable @typescript-eslint/no-var-requires */
const postcss = require("postcss");

module.exports = {
  plugins: [
    require("postcss-import"),
    require("tailwindcss"),
    require("postcss-flexbugs-fixes"),
    require("postcss-focus-visible"),
    require("postcss-preset-env")({
      autoprefixer: {
        flexbox: "no-2009",
      },
      stage: 3,
    }),
    // Custom plugin to work around `:focus-visible` bug in a nested dependency of `webpacker`
    // See https://github.com/rails/webpacker/issues/3076
    function(root) {
      root.walkRules(/:focus-visible/, function(rule) {
        const supportsAtRule = postcss.atRule({ name: "supports", params: "(display: block)" });
        supportsAtRule.append(rule.clone());
        root.insertBefore(rule, supportsAtRule);
        rule.remove();
      });
    },
  ],
};
