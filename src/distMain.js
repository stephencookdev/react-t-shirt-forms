"use strict";

if (process.env.NODE_ENV === "production") {
  module.exports = require("./react-t-shirt-forms.production.js");
} else {
  module.exports = require("./react-t-shirt-forms.development.js");
}
