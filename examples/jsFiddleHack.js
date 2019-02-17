// We need to hack the `require` function, since our example code uses it, but
// JSFiddle is not set up to use `require`, and just uses UMD packages

function require(x) {
  if (x === "react-t-shirt-forms/dist/stylesheets/basic.min.css") {
    return;
  }

  var reqMap = {
    react: React,
    "react-dom": ReactDOM,
    "react-t-shirt-forms": TShirtForm
  };
  return reqMap[x];
}
