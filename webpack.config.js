'use strict';
const path = require('path');
const node = { fs: 'empty', net: 'empty' };

module.exports = {
  entry: {
    main: './src/main.tsx',
    content: './src/content.ts',
    background: './src/background.ts'
  },
  output: { filename: './app/dist/[name].js' },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [ path.resolve(__dirname, 'node_modules/preact-compat/src') ],
      },
      { test: /\.tsx?$/, loader: 'babel-loader!ts-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
    ],
  },
  node: node,
  devtool: 'source-map',
  resolve: { extensions: [ '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.jsx' ] },
  plugins: [],
};
