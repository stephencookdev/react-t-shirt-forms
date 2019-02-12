"use strict";

if (process.env.NODE_ENV === "production") {
  module.exports = require("./cjs/reformjs.production.js");
} else {
  module.exports = require("./cjs/reformjs.development.js");
}
