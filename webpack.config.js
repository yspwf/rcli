const path = require('path')
const nodeExternals = require('webpack-node-externals'); 

module.exports = {
  target: 'node',
  entry: './src/entry.js',
  output:{
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js'
  },
  module:{
    rules:[
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options:{
          "presets":["@babel/preset-env"]
        }
      }
    ]
  },
  externals: [nodeExternals()]
}