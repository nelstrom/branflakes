'use strict';

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    // Add options here
  });

  const { Webpack } = require('@embroider/webpack');
  return require('@embroider/compat').compatBuild(app, Webpack, {
    staticAddonTestSupportTrees: true,
    staticAddonTrees: true,
    staticHelpers: true,
    staticModifiers: true,
    staticComponents: true,
    // splitAtRoutes: ['one', 'two', 'three'], // can also be a RegExp
    packagerOptions: {
      webpackConfig: {
        plugins: [new BundleAnalyzerPlugin()],
      },
    },
  });
};
