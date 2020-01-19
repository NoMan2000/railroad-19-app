// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const webpack = require('@cypress/webpack-preprocessor');
// eslint-disable-next-line
module.exports = (on, config) => {
  const options = webpack.defaultOptions;
  const customWebpackOptions = require('./webpack.config.js');
  options.webpackOptions.module.rules = options.webpackOptions.module.rules.concat(
    customWebpackOptions.module.rules
  );

  on('file:preprocessor', webpack(options));
};
