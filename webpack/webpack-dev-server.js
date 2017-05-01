const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config')

const ip = 'localhost'
const port = 3000

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  host: ip,
  stats: false,
  historyApiFallback: true,
  contentBase: 'public',
  compress: true,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
}).listen(port, ip, function (err) {
  if (err) {
    return console.log(err)
  }

  console.log(`Listening at http://${ip}:${port}`)
})
