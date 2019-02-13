const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const examples = [
  "basic",
  "custom-styling",
  "server-errors",
  "validations",
  "custom-validation-library",
  "default-schema-options",
  "default-form-options",
  "form-options",
  "form-exceptions",
  "show-only-when",
  "groups"
];

module.exports = {
  entry: examples.reduce(
    (acc, cur) => ({
      ...acc,
      [cur]: [
        "@babel/polyfill",
        `${__dirname}/hmr.js`,
        `${__dirname}/${cur}/index.js`
      ]
    }),
    {}
  ),
  output: {
    path: __dirname + "/dist/examples",
    publicPath: "/",
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: [
              "@babel/plugin-proposal-class-properties",
              "@babel/plugin-transform-runtime"
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      }
    ]
  },
  plugins: examples.reduce(
    (acc, cur) =>
      acc.concat(
        new HtmlWebpackPlugin({
          template: __dirname + "/index.html",
          title: cur,
          chunks: [cur],
          filename: cur
        })
      ),
    []
  ),
  resolve: {
    alias: {
      "react-t-shirt-forms": path.resolve(__dirname, "../src")
    }
  },
  devServer: {
    contentBase: __dirname + "./dist/examples"
  },
  devtool: "source-map"
};
