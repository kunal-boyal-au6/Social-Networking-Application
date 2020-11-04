let DataUri = require("datauri");
let path = require("path");

let dataURIChild = new DataUri();

module.exports = (originalName, buffer) => {
  let extension = path.extname(originalName);
  return dataURIChild.format(extension, buffer).content;
};


