const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");

module.exports = merge(commonConfig, {
  mode: "development",
  devServer: {
    //disableHostCheck: true, // for 'Invalid Host Header', but 'public: "posts.com"' seems to take care of this
    port: 3000,
    host: "0.0.0.0", // add for docker
    hot: true,
    historyApiFallback: {
      index: "index.html",
    },
    overlay: true,
    //    writeToDisk: true,
    public: "posts.com", // change devconfig if needed to whatever app is named (e.g. client:80), added with nginx use
    //    proxy: [
    //      {
    //        context: ["/posts", "/posts/create"],
    //        target: "http://posts.com",
    //      },
    //    ], // <--- use if working with backend, paths are just examples.
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
      filename: "styles.css",
    }),
  ],
});
