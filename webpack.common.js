const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');

const basePath = '/digital-prm-web-ui/';

const CSSModuleLoader = {
  loader: 'css-loader',
  options: {
    modules: true,
    localIdentName: '[name]_[local]_[hash:base64:5].css'
  }
};

const CSSLoader = {
  loader: 'css-loader',
  options: {
    modules: false
  }
};

const PostCSSLoader = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: [autoprefixer]
    }
  }
};

const config = {
  entry: path.join(__dirname, './src/index.js'),
  output: {
    path: path.join(__dirname, './dist'),
    publicPath: basePath,
    clean: true
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      title:"DPRM",
      // favicon: './public/favicon2.ico',
      template: path.join(__dirname, 'public/index.html')
    }),
    new webpack.HotModuleReplacementPlugin(),
    // new CopyPlugin([
    //   // /{ from: './src/locale', to: 'locale' },
    //   // { from: './public/assets/', to: 'assets' },
    //   // { from: './public/config.js', to: 'config.js' },
    //   { from: './public/assets/', to: 'assets' },
    //   { from: './public/config.js', to: 'config.js' },
    //   { from: './public/index.html', to: 'index.html' },
    //   // { from: './public/help/', to: 'help' },/
    //   { from: './public/config.js.template', to: 'config.js.template' }
    // ]),
    new CopyPlugin({
      patterns: [
        // { from: './src/locale', to: 'locale' },
        { from: './public/assets/', to: 'assets' },
        { from: './public/assets/icons', to: 'assets/icons' },
        { from: './src/fonts', to: 'fonts' },
        // { from: './public/index.html', to: 'index.html' },
        // { from: './src/assets/images', to: 'assets/images' },
        { from: './public/config.js', to: 'config.js' },
        { from: './public/config.js.template', to: 'config.js.template' }  // template for docker entrypoint
      ]
    }),
    new webpack.DefinePlugin({
      __BASE_PATH__: JSON.stringify(basePath)
    })
  ],
  // module: {

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          },
          include: path.resolve(__dirname, 'src')
        },
        {
          test: /\.json$/,
          loader: 'json-loader',
          type: 'javascript/auto'
        },
        // {
        //   test: /\.json$/,
        //   loader: '@lingui/loader',
        //   type: 'javascript/auto'
        // },
  
        // Opt-in support for SASS (using .scss or .sass extensions).
        // Chains the sass-loader with the css-loader and the style-loader
        // to immediately apply all styles to the DOM.
        // By default we support SASS Modules with the
        // extensions .module.scss or .module.sass
        {
          test: /\.(sa|sc|c)ss$/,
          exclude: /\.module\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            CSSLoader,
            PostCSSLoader,
            'sass-loader'
          ]
        },
        // Adds support for CSS Modules, but using SASS
        // using the extension .module.scss or .module.sass
        {
          test: /\.module\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            CSSModuleLoader,
            PostCSSLoader,
            'sass-loader'
          ]
        },     
        {
          test: /\.(jpe?g|png|gif|ico)$/i,
  
          use: [
            {
              loader: 'url-loader',
              options: {
                fallback: 'file-loader',
                name: '[name][md5:hash].[ext]',
                outputPath: 'assets/'
                //publicPath: "/assets/"
              }
            }
          ]
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|pdf)$/i,  
          type: 'asset/resource',
  
          generator: {
  
            filename: './assets/images/[name][ext]'
  
          }
  
        },
        // {
        //   // test: /\.(svg|png|jpe?g|gif|woff2|woff)(\?\S*)?$/,
        //   test: /\.(svg|png|jpe?g|gif|woff2|woff|pdf)(\?\S*)?$/,
        //   loader: 'file-loader?name=[path][name].[ext]?[hash]' 
        //   // use: [
        //   //   {
        //   //     loader: 'url-loader',
        //   //     options: {
        //   //       limit: 100000,
        //   //       //publicPath: "/public/assets/",
        //   //       name: '[name].[ext]'
        //   //     }
        //   //   }
        //   // ]
        // },
        {

          test: /\.(eot|ttf|woff|woff2)$/,  
          // loader: 'url-loader',    
          type: 'asset/inline',  
          // use: { 
          //   loader: 'url-loader',    
          // },  
          // generator: {  
          //   filename: './assets/fonts/[name].[ext]'  
          // }    
          // options: {  
          //   limit: 10000  
          // fallback: 'file-loader'  
          // }    
        },
        {
          test: /\.po$/,
          use: [{ loader: 'json-loader' }, { loader: 'po-gettext-loader' }]
        }
      ]
    },
  //   rules: [
  //     {
  //       test: /\.(js|jsx)$/,
  //       exclude: /(node_modules|bower_components)/,
  //       use: ['babel-loader'],
  //       include: path.resolve(__dirname, 'src')
  //     },
  //     {
  //       test: /\.json$/,
  //       loader: 'json-loader',
  //       type: 'javascript/auto'
  //     },
  //     // {
  //     //   test: /\.json$/,
  //     //   loader: '@lingui/loader',
  //     //   type: 'javascript/auto'
  //     // },

  //     // Opt-in support for SASS (using .scss or .sass extensions).
  //     // Chains the sass-loader with the css-loader and the style-loader
  //     // to immediately apply all styles to the DOM.
  //     // By default we support SASS Modules with the
  //     // extensions .module.scss or .module.sass
  //     {
  //       test: /\.(sa|sc|c)ss$/,
  //       exclude: /\.module\.(sa|sc|c)ss$/,
  //       use: [
  //         MiniCssExtractPlugin.loader,
  //         CSSLoader,
  //         PostCSSLoader,
  //         'sass-loader'
  //       ]
  //     },
  //     // Adds support for CSS Modules, but using SASS
  //     // using the extension .module.scss or .module.sass
  //     {
  //       test: /\.module\.(sa|sc|c)ss$/,
  //       use: [
  //         MiniCssExtractPlugin.loader,
  //         CSSModuleLoader,
  //         PostCSSLoader,
  //         'sass-loader'
  //       ]
  //     },
  //     {
  //       // test: /\.(png|svg|jpg|jpeg|gif)$/i,
  //       test: /\.(svg|png|jpe?g|gif|woff2)(\?\S*)?$/,
  //       use: [
  //         {
  //           loader: 'url-loader',
  //           options: {
  //             fallback: 'file-loader',
  //             name: '[name][md5:hash].[ext]',
  //             outputPath: 'assets/'
  //           }
  //         }
  //       ]
  //     },
  //     {
  //       test: /\.po$/,
  //       use: [{ loader: 'json-loader' }, { loader: 'po-gettext-loader' }]
  //     }
  //   ]
  // },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    },
    modules: [path.resolve(__dirname, './src'), 'node_modules'],
    extensions: ['*', '.js', '.jsx']
  },
  externals: {
    config: 'DPRM_CONFIG',
    'config.js': 'DPRM_CONFIG'
  }
};

module.exports = {
  config,
  basePath,
  CSSLoader,
  CSSModuleLoader,
  PostCSSLoader
};
