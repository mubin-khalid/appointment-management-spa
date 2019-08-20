const fs = require('fs')
module.exports = {
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8080, // CHANGE YOUR PORT HERE!
    http2: true,
    https: true,
    hotOnly: true,
    key: fs.readFileSync('/Users/mk/sandbox/development/certs/192.168.10.4+3-key.pem'),
    cert: fs.readFileSync('/Users/mk/sandbox/development/certs/192.168.10.4+3.pem')
  },
}