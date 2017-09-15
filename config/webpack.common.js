
// common config
const path = require('path');
const webpack = require('webpack');

let commonConfig = {
  devtool: 'inline-source-map',
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
  ],
  module: {
    rules: [{
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.(gif|png|jpe?g|svg)$/,
      loader: 'url-loader',
      options: {
        // byte
        limit: 8192
      }
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /(node_modules|config)/,
    }]
  }
}

module.exports = commonConfig;