const pathToPKG = __dirname + '/../package.json';
const pkg = require(pathToPKG);
pkg.version = pkg.version
  .split('.')
  .map((n, i) => i === 2 ? parseInt(n) + 1 : parseInt(n))
  .join('.');
require('fs').writeFileSync(
  pathToPKG,
  JSON.stringify(pkg, null, 2)
);