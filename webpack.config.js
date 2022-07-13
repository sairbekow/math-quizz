const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const HTMLWebpackPlugin = require("html-webpack-plugin")

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: process.env.NODE_ENV,
  entry: "./scripts/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "assets/images/[name][ext]"
  },
  devServer: {
    port: 4000,
    hot: isDev,
    watchFiles: ['src/index.html']
  },
  target: isDev ? "web" : "browserslist",
  resolve: {
    extensions: ['.js', '.json', '.png', '.jpg', '.css', '.svg'], //надо чекнуть это свойство
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./index.html",
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      }
    ]
  },
}