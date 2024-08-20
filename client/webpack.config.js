import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: resolve(__dirname, "../public/bundle"),
    filename: "bundle.js",
    publicPath: "/", // ensure all urls in css file are treated as absolute (absolute to public folder)
  },
  devServer: {
    static: {
      directory: resolve(__dirname, "../public"),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        include: resolve(__dirname, "./src"),
        use: [
          "style-loader",
          // I previous have issue that webpack laaded the wrong path for font-face and background image, disable url so that webpack won't process url
          { loader: "css-loader", options: { url: false } },
          "postcss-loader",
        ],
      },
      {
        test: /\.css$/i,
        include: resolve(__dirname, "node_modules/quill"), // For Quill's CSS, allow URL processing
        use: [
          "style-loader",
          // I previous have issue that webpack laaded the wrong path for font-face and background image, disable url so that webpack won't process url
          { loader: "css-loader", options: { url: false } },
          "postcss-loader",
        ],
      },
      {
        test: /\.(j|t)s$/,
        include: resolve(__dirname, "./src"),
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
