
// common config
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let commonConfig = {
  entry: {
    app: [
      path.resolve(__dirname, '../src/index.js')
    ]
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin ({
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/index.html'),
      inject: true
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ],
  module: {
    rules: [{
      test: /\.css$/,
      loader: 'css-loader'
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