import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";
// eslint-disable-next-line import/no-extraneous-dependencies
import dotenv from "dotenv";
// eslint-disable-next-line import/no-extraneous-dependencies, node/no-unpublished-import
import MiniCssExtractPlugin from "mini-css-extract-plugin";
// eslint-disable-next-line import/no-extraneous-dependencies, node/no-unpublished-import
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
// eslint-disable-next-line node/no-unpublished-import
import webpack from "webpack";

const __dirname = dirname(fileURLToPath(import.meta.url));

// console.log(__dirname);

dotenv.config({ path: resolve(__dirname, "../.env") });

console.log(process.env.NODE_ENV);

const { DefinePlugin } = webpack;

export default {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  devtool:
    process.env.NODE_ENV === "production"
      ? "source-map"
      : "cheap-module-source-map",
  entry: "./src/index.js",
  output: {
    path: resolve(__dirname, "../public/bundle"),
    filename: "bundle.js",
    publicPath: "/bundle/", // ensure all urls in css file are treated as absolute (absolute to public folder)
    // clean: true,
    module: true,
  },
  experiments: {
    outputModule: true,
  },
  devServer: {
    static: {
      directory: resolve(__dirname, "../public"),
    },
    port: 3000,
    open: false,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        include: resolve(__dirname, "./src"),
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          // "style-loader",
          // I previous have issue that webpack laaded the wrong path for font-face and background image, disable url so that webpack won't process url
          { loader: "css-loader", options: { url: false } },
          "postcss-loader",
        ],
      },
      // {
      //   test: /\.css$/i,
      //   // since I directly copied quill css to public/bundle, no need to include quill css file from node_modules
      //   // include: resolve(__dirname, "node_modules/quill"), // For Quill's CSS, allow URL processing
      //   use: [
      //     MiniCssExtractPlugin.loader,
      //     // "style-loader",
      //     // I previous have issue that webpack laaded the wrong path for font-face and background image, disable url so that webpack won't process url
      //     { loader: "css-loader", options: { url: false } },
      //     "postcss-loader",
      //   ],
      // },
      {
        test: /\.(j|t)s$/,
        include: [
          resolve(__dirname, "./src"),
          resolve(__dirname, "node_modules/quill"),
        ],
        exclude: (filePath) =>
          /node_modules/.test(filePath) &&
          !/node_modules\/quill/.test(filePath),
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin({})],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "bundle.css" }),
    new DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};
