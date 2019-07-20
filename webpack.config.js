var webpack = require('webpack');
var path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'src');

module.exports = {
  entry: [APP_DIR + '/rui.jsx'],
  output: { path: BUILD_DIR, filename: 'rui.js' },
  plugins: [
    new webpack.DefinePlugin(
      { 'process.env': { 'NODE_ENV': JSON.stringify('production') } }),
    // new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}})
  ],
  module: {
    rules: [{
      test: /\.js?/,
      include: APP_DIR,
      //loader: 'babel-loader',
      //query: { presets: ['es2015', 'react'] },
      use: { loader: "babel-loader" }
    }]
  },
  stats: { colors: true },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({ /* your config */ })
    ]
  }
};
