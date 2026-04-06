import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "node:path";

export default {
  entry: "./src/index.js",
  experiments: {
    outputModule: true,
  },
  output: {
    filename: "main.js",
    path: path.resolve(import.meta.dirname, "dist"),
    clean: true,
    module: true,
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/templates/template.html",
      scriptLoading: "module",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
