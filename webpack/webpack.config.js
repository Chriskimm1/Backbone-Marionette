const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const ip = 'localhost'
const port = 3000
const DEBUG = process.env.NODE_ENV !== 'production'

const cssLoaderConfig = 'css-loader'

const config = {
  devtool: DEBUG ? 'eval' : false,
  entry: {
    app: [path.join(__dirname, '../src/app')],
    vendor: [
      'jquery',
      'lodash',
      'backbone',
      'backbone.marionette'
    ]
  },
  output: {
    path: path.join(__dirname, '../public'),
    filename: '[name].[hash].js'
  },
  resolve: {
    modules: ['src', 'node_modules'],
    alias: {
      app: path.resolve(__dirname, '..', 'src', 'app')
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`
    }),
    new HtmlWebpackPlugin({
      filename: '../public/index.html',
      template: path.resolve(__dirname, '..', 'src', 'html.hbs'),
      inject: false,
      alwaysWriteToDisk: true,
      path: !DEBUG ? '/public' : ''
    }),
    new HtmlWebpackHarddiskPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: '[name].[hash].js',
      minChunks: Infinity
    }),
    new webpack.NamedModulesPlugin(),
    new CleanWebpackPlugin(['../public'], {
      allowExternal: true
    }),
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, '../src/static'), to: 'static' }
    ])
  ],
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loader: DEBUG ? `style-loader!${cssLoaderConfig}` : ExtractTextPlugin.extract({ fallback: 'style-loader', use: cssLoaderConfig }) },
      { test: /\.hbs$/, loader: 'handlebars-loader' },
    ]
  }
}

if (DEBUG) {
  config.entry.app.unshift(
    `webpack-dev-server/client?http://${ip}:${port}/`,
    'webpack/hot/only-dev-server'
  )

  config.plugins = config.plugins.concat([
    new webpack.HotModuleReplacementPlugin()
  ])
} else {
  config.plugins = config.plugins.concat([
    new ExtractTextPlugin('app.[hash].css'),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
  ])
}

module.exports = config
