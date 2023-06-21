const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
  target: 'node',
  mode: 'development',
  devtool: 'source-map',
  watch: true,
  entry: path.join(__dirname, './src/common/services/pricing/test/test.js'),
  output: {
    filename: 'js/test.js'
  },
  resolve: {
    alias: {
      'fetch': 'node-fetch'
    },
    modules: [path.resolve(__dirname, './src'), 'node_modules'],
    extensions: ['*', '.js', '.jsx']
  }
};

module.exports = config;
