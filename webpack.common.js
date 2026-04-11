import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "node:path";

export default {
  entry: "./src/index.ts",
  experiments: {
    outputModule: true,
  },
  output: {
    filename: "main.js",
    path: path.resolve(import.meta.dirname, "dist"),
    clean: true,
    module: true,
  },

  resolve: {
    extensions: [".ts",".js"],
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
      {
        test: /.ts$/i,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
        },
        exclude: /node_modules/,
      },
    ],
  },
};
