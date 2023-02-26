const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    ship: "./src/factories/ship.js",
    gameboard: "./src/factories/gameboard.js",
    player: "./src/factories/player.js",
    ai: "./src/factories/ai.js",
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
