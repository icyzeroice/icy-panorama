const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const commonConfig = require('./webpack.common');

let prodConfig = merge(commonConfig, {
  output: {
    path: path.resolve(__dirname, '../dist/'),
    filename: 'icy-paronama.js',
    publicPath: './'
  },
  plugins: [
    new CleanWebpackPlugin('./dist', {
      root: path.resolve(__dirname, '../')
    })
  ]
});

module.exports = prodConfig;