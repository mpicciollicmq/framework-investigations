const BabiliPlugin = require("babili-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")
const webpack = require("webpack")

const nodeEnv = process.env.NODE_ENV || "development"
const isProduction = nodeEnv === "production"

const outputDir = path.join(__dirname, "dist")

const plugins = [
  new HtmlWebpackPlugin({
    minify: {
      collapseInlineTagWhitespace: true,
      collapseWhitespace: true,
      minifyCSS: true,
      removeComments: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true
    },
    template: "src/index.html"
  }),
  new webpack.DefinePlugin({
    "process.env": { NODE_ENV: JSON.stringify(nodeEnv) }
  })
]

if (isProduction) {
  plugins.push(
    new BabiliPlugin()
  )
} else {
  plugins.push(
    new webpack.HotModuleReplacementPlugin()
  )
}

module.exports = {
  devServer: {
    compress: true,
    contentBase: outputDir,
    historyApiFallback: true,
    port: 9000
  },
  devtool: "source-map",
  entry: {
    "client": "./src/Main.tsx"
  },
  module: {
    rules: [
      {
        loader: "ts-loader",
        test: /\.tsx?$/
      }
    ]
  },
  output: {
    filename: "[name].[hash:8].js",
    path: outputDir
  },
  plugins: plugins,
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    modules: ["node_modules"]
  }
}