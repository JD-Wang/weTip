const { name, port } = require('./package.json')
module.exports = {
  apps : [{
    script: 'index.js',
    name: `${name}:${port}`,
  }],
}
