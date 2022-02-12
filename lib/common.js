const fs = require('fs');
const CleanCSS = require('clean-css');
const chalk = require('chalk');
const browserify = require('browserify');
const UglifyJS = require("uglify-js");

const inputCSS = `${__dirname}/../src/css/styles.css`;
const outputCSS = `${__dirname}/../public/assets/styles.css`;
const inputJS = `${__dirname}/../src/js/simpre.js`;
const outputJS = `${__dirname}/../public/assets/simpre.js`;

function compileCSS() {
  const minifiedCSS = new CleanCSS().minify(fs.readFileSync(inputCSS).toString('utf-8'));
  fs.writeFileSync(outputCSS, minifiedCSS.styles);
  console.log(chalk.green('CSS saved'));
}
function compileJS() {
  const b = browserify();
  b.add(inputJS);
  b.bundle((err, buf) => {
    if (err) {
      console.log(chalk.red(err.toString()));
    } else {
      const res = UglifyJS.minify(buf.toString('utf-8'));
      fs.writeFileSync(outputJS, res.code);
      console.log(chalk.green('JS saved'));
    }
  });
}

module.exports = {
  inputCSS,
  compileCSS,
  compileJS
}