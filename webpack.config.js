'use strict'

const path = require('path')
const node = {
  fs: 'empty',
  net: 'empty'
}

module.exports = {
  entry: './src/main.tsx',
  output: {
    filename: './app/dist/main.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, 'node_modules/preact-compat/src')
        ]
      },
      {
        test: /\.tsx?$/,
        loader: 'babel-loader!ts-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  },
  node: node,
  devtool: 'source-map',
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.jsx']
  },
  plugins: []
}
