const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    shipFactory: "./src/factories/ship.js",
    gameboardFactory: "./src/factories/gameboard.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Document",
    }),
  ],
  output: {
    filename: "[name]bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
