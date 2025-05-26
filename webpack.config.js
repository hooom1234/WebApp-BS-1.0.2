const path = require("path");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  mode: "development", // หรือ "production" หากต้องการใช้ build production
  entry: "./index.js",
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/, // ✅ รองรับ JSX และ TypeScript
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/, // ✅ โหลดไฟล์รูป
        use: {
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]",
          },
        },
      },
      {
        test: /\.(ttf|otf|eot|woff|woff2)$/, // ✅ โหลดฟอนต์
        use: {
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]",
          },
        },
      }
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"], // ✅ รองรับ JSX, TSX
    alias: {
      "react-native$": "react-native-web"
    },
    fallback: {
      buffer: require.resolve("buffer/"), // ✅ รองรับ buffer สำหรับ axios
    },
  },
  plugins: [new NodePolyfillPlugin()],
};
