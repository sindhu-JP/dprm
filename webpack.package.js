const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = merge(common.config, {
  mode: 'production',
  devtool: 'source-map',
  entry: path.join(__dirname, './src/exports.js'),
  output: {
    filename: 'js/exports.js',
    libraryTarget: 'commonjs2'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new webpack.BannerPlugin({
      banner: new GitRevisionPlugin().version()
    })
  ],
  externals: [
    {
      config: 'dclmConfig',
      'config.js': 'dclmConfig',
      react: 'commonjs2 react',
      'react-dom': 'commonjs2 react-dom'
    },
    /@material-ui\/.*/,
    /@lingui\/.*/
  ]
});

module.exports = config;
