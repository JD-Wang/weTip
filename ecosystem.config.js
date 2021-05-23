const { name, port } = require('./package.json')
module.exports = {
  apps : [{
    script: 'app.js',
    name: `${name}:${port}`,
  }],
}
