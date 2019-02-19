import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import { terser } from "rollup-plugin-terser";

const configOptions = [
  { format: "cjs", production: true },
  { format: "cjs" },
  { format: "umd", production: true },
  { format: "umd" },
  { format: "esm", production: true },
  { format: "esm" }
];

const baseConfig = ({ format, production }) => ({
  input: "src/index.js",
  output: {
    format,
    name: "TShirtForm",
    file: `dist/${format}/react-t-shirt-forms.${
      production ? "production" : "development"
    }.js`,
    exports: "named",
    globals: {
      react: "React"
    }
  },
  external: ["react"],
  plugins: [
    babel({ runtimeHelpers: true, exclude: "node_modules/**" }),
    commonjs({
      include: "node_modules/**"
    }),
    resolve()
  ].concat(production ? terser() : [])
});

export default configOptions.map(baseConfig);
