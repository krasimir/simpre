const pkg = require(__dirname + '/../package.json');
const version = pkg.version.split('.').map(n => parseInt(n));
version[2] += 1;
pkg.version = version.join('.');
require('fs').writeFileSync(__dirname + '/../package.json', JSON.stringify(pkg, null, 2));