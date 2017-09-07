const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');

let devConfig = merge(commonConfig, {
  entry: {
    app: [
      path.resolve(__dirname, './dev-client'),
    ],
  },
  output: {
    path: path.resolve(__dirname, '../dist/'),
    filename: '[name].bundle.js',

    // public path defined by processEnviroment
    // to let the auto-refresh work, we cannot use absolute url
    // you can write reload instead of using this
    publicPath: '/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ]
});

module.exports = devConfig;