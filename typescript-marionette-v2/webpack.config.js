var HtmlWebpackPlugin = require("html-webpack-plugin")
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');

module.exports = {
  // Enable sourcemaps for debugging webpack's output. Temporarely disabled, because they cause Webpack to crash. https://github.com/webpack/webpack/issues/1071.
  devtool: "source-map",
  //devtool: "eval-source-map",
  entry: "./src/index.ts",
  module: {
    loaders: [
      // All files with a .ts extension will be handled by ts-loader.
      { test: /\.ts$/, loader: "ts-loader" }
    ],

    preLoaders: [
      // All output .js files will have any sourcemaps re-processed by source-map-loader.
      { test: /\.js$/, loader: "source-map-loader" }
    ]
  },
  output: {
    path: "dist",
    filename: "bundle.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.ejs"
    })
  ],
  resolve: {
    // Add .ts as resolvable extensions.
    extensions: ["", ".js", ".ts"]
  }
}