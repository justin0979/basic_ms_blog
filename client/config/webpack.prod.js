const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");

module.exports = merge(commonConfig, {
  entry: ["./src"],
  output: {
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "", // without /, kept getting 404 errors when refreshing with redux-form
    // with /, running `npm run build` would not find bundle or any other file
  },
  mode: "production",
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon-32x32.png",
      meta: {
        viewport: "width=device-width, initial-scale=1",
      },
    }),
    new MiniCssExtractPlugin({
      filename: "styles.[contenthash].css",
    }),
  ],
});
