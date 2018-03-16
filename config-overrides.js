const rewireMobX = require("react-app-rewire-mobx");
const rewireCssModules = require("react-app-rewire-css-modules");

module.exports = function override(config, env) {
  config = rewireMobX(config, env);
  config = rewireCssModules(config, env);
  return config;
};
