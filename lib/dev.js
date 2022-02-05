const fs = require('fs');
const chokidar = require("chokidar");
const CleanCSS = require('clean-css');
const browserify = require('browserify');
const chalk = require('chalk');

const { runServer } = require('../sdk/dev');

runServer(`${__dirname}/lib`, `node ./lib/index.js`);

const inputCSS = `${__dirname}/lib/src/css/styles.css`;
const outputCSS = `${__dirname}/lib/public/styles.min.css`;
chokidar
  .watch(inputCSS)
  .on("all", () => {
    const minifiedCSS = new CleanCSS({}).minify(fs.readFileSync(inputCSS).toString('utf-8'));
    fs.writeFileSync(outputCSS, minifiedCSS.styles);
    console.log('CSS saved');
  });

const inputJS = `${__dirname}/lib/src/js/index.js`;
const outputJS = `${__dirname}/lib/public/app.min.js`;
chokidar
  .watch(`${__dirname}/lib/src/js/**/*.js`)
  .on("all", () => {
      var b = browserify();
      b.add(inputJS);
      b.bundle((err, buf) => {
        if (err) {
          console.log(chalk.red(err.toString()));
        } else {
          fs.writeFileSync(outputJS, buf.toString('utf-8'));
          console.log('JS saved');
        }
      });
  });