const CompressionPlugin = require("compression-webpack-plugin");
const path = require("path");

const experiments = {
  nothing: "nothing",
  bareBones: "bare-bones",
  withStyling: "with-CSS-stylings",
  withYupValidation: "with-yup-validation"
};

module.exports = {
  mode: "production",
  entry: Object.keys(experiments).reduce(
    (acc, cur) => ({
      ...acc,
      [experiments[cur]]: `${__dirname}/experiments/${cur}.js`
    }),
    {}
  ),
  output: {
    path: __dirname + "/dist",
    publicPath: "/",
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      }
    ]
  },
  plugins: [new CompressionPlugin()],
  resolve: {
    alias: {
      "react-t-shirt-forms/dist/stylesheets": path.resolve(
        __dirname,
        "../dist/stylesheets"
      ),
      "react-t-shirt-forms": path.resolve(__dirname, "../dist/esm")
    }
  }
};
