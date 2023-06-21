const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common.js');
// const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const proxyHost = 'dclm-mmp.cluster1.devtestlab2.tecnotree.com';
const ESLintPlugin = require('eslint-webpack-plugin');
// const proxyHost = 'dclmuat.stc.com.kw'    //UAT URL
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
const isDevelopment = process.env.NODE_ENV ? true : false;
// process.env.NODE_ENV !== 'development';
const config = merge.smart(common.config, {
  mode: 'development',
  devtool: 'eval-source-map',
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].chunk.js'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].chunk.css'
    }),
    new webpack.HotModuleReplacementPlugin(),
    // new ReactRefreshWebpackPlugin({
    //   esModule: true,
    //   overlay: false
    // }),
    new ESLintPlugin({
      // Plugin options
      extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
      formatter: require.resolve('react-dev-utils/eslintFormatter'),
      eslintPath: require.resolve('eslint'),
      failOnError: true,
      context: resolveApp('src'),
      cache: true,
      cacheLocation: path.resolve(
        resolveApp('node_modules'),
        '.cache/.eslintcache'
      ),
      // ESLint class options
      cwd: resolveApp('.'),
      resolvePluginsRelativeTo: __dirname,
      baseConfig: {
        extends: [require.resolve('eslint-config-react-app/base')],
        rules: {
          ...{
            'react/react-in-jsx-scope': 'error'
          }
        }
      }
    })
  ].filter(Boolean),

  module: {
    rules: [
      // {
      //   test: /\.[jt]sx?$/,
      //   exclude: /node_modules/,
      //   use: [
      //     {
      //       loader: require.resolve('babel-loader'),
      //       options: {
      //         plugins: [
      //           isDevelopment && require.resolve('react-refresh/babel')
      //         ].filter(Boolean)
      //       }
      //     }
      //   ]
      // },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /\.module\.(sa|sc|c)ss$/,
        use: [
          'css-hot-loader',
          MiniCssExtractPlugin.loader,
          common.CSSLoader,
          common.PostCSSLoader,
          'sass-loader'
        ]
      },
      {
        test: /\.module\.(sa|sc|c)ss$/,
        use: [
          'css-hot-loader',
          MiniCssExtractPlugin.loader,
          common.CSSModuleLoader,
          common.PostCSSLoader,
          'sass-loader'
        ]
      }
    ]
  },
  // devServer: {
  //   contentBase: path.join(__dirname, './dist'),
  //   writeToDisk: true,
  //   compress: true,
  //   inline: true,
  //   port: 3000,
  //   publicPath: common.basePath,
  //   historyApiFallback: true,
  //   open: true,
  //   openPage: common.basePath.replace(/^\//, ''),
  //   hot: true,
  //   progress: true,
  //   overlay: true,
  //   headers: {
  //     'Access-Control-Allow-Origin': '*'
  //   },
  //   proxy: {
  //     '/api': {
  //       target: `https://${proxyHost}/`,
  //       pathRewrite: { '^/api': '' },
  //       secure: false,
  //       headers: {
  //         Host: proxyHost
  //       }
  //     },
  //     '/product': {
  //       target: `https://${proxyHost}/`,
  //       changeOrigin: true,
  //       pathRewrite: { '^/product': '' },
  //       secure: false,
  //       headers: { Host: proxyHost }
  //     }
  //   }
  // }
  devServer: {  
    open: [common.basePath],    
    liveReload: false,  
    client: {   
      overlay: true,    
      progress: true,   
      reconnect: true   
    },  
    devMiddleware: {    
      index: true,  
      mimeTypes: { phtml: 'text/html' },    
      publicPath: common.basePath,  
      serverSideRender: true,   
      writeToDisk: true 
    },  
    static: path.join(__dirname, './dist'), 
    compress: true, 
    port: 3000, 
    historyApiFallback: true,   
    hot: true,  
    headers: {  
      'Access-Control-Allow-Origin': '*'    
    },  
    proxy: {    
      '/api': { 
        target: `https://${proxyHost}/`,    
        pathRewrite: { '^/api': '' },   
        secure: false,  
        headers: {  
          Host: proxyHost   
        }   
      },    
      '/product': { 
        target: `https://${proxyHost}/`,    
        changeOrigin: true, 
        pathRewrite: { '^/product': '' },   
        secure: false,  
        headers: { Host: proxyHost }    
      },    
      // NOTE: DO NOT DELETE. Any new DCLM CONFIG added in dclmConfig.js can be added here  
      ...['/rules-service', '/drm'].reduce((acc, current) => {  
        acc[current] = {    
          target: `https://${proxyHost}/`,  
          changeOrigin: true,   
          secure: false,    
          headers: { Host: proxyHost }  
        };  
        return acc; 
      }, {})    
    }   
  }
});

module.exports = config;
