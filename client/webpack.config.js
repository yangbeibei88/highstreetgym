import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: resolve(__dirname, "../public"),
    filename: "bundle.js",
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
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
};
