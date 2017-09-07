
const webpack = require('webpack');
const prodConfig = require('./webpack.prod')

webpack(prodConfig, function (err, stats) {
  if(err) throw err;
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }));
});