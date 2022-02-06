const chokidar = require("chokidar");
const { inputCSS, compileCSS, compileJS } = require('./common');

chokidar.watch(inputCSS).on("all", compileCSS);
chokidar.watch(`${__dirname}/../src/js/**/*.js`).on("all", compileJS);