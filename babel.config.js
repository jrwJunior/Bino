"use strict";

module.exports = function(api) {
  api.cache(true);

  return {
    presets: [
      "@babel/preset-env",
    ]
  };
};