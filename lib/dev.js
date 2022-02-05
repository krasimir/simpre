const fs = require('fs');
const chokidar = require("chokidar");
const CleanCSS = require('clean-css');
const browserify = require('browserify');
const chalk = require('chalk');

const inputCSS = `${__dirname}/../src/css/styles.css`;
const outputCSS = `${__dirname}/../public/assets/styles.min.css`;

chokidar
  .watch(inputCSS)
  .on("all", () => {
    const minifiedCSS = new CleanCSS({}).minify(fs.readFileSync(inputCSS).toString('utf-8'));
    fs.writeFileSync(outputCSS, minifiedCSS.styles);
    console.log(chalk.green('CSS saved'));
  });

const inputJS = `${__dirname}/../src/js/simpre.js`;
const outputJS = `${__dirname}/../public/assets/simpre.js`;

chokidar
  .watch(`${__dirname}/../src/js/**/*.js`)
  .on("all", () => {
      var b = browserify();
      b.add(inputJS);
      b.bundle((err, buf) => {
        if (err) {
          console.log(chalk.red(err.toString()));
        } else {
          fs.writeFileSync(outputJS, buf.toString('utf-8'));
          console.log(chalk.green('JS saved'));
        }
      });
  });