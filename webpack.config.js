var webpack = require('webpack');
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// Webpack Config
var webpackConfig = {
  entry: {
    'polyfills': './src/polyfills.browser.ts',
    'vendor':    './src/vendor.browser.ts',
    'main':       './src/main.browser.ts'
  },

  output: {
    path: './dist',
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({ name: ['main', 'vendor', 'polyfills'], minChunks: Infinity }),
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(".bower.json", ["main"])
    ),

    // copy index.html from src to dist
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      chunksSortMode: 'dependency'
    }),

    // copy assets
    new CopyWebpackPlugin([
      {
        // roboto font
        from: path.join(__dirname, "/node_modules/materialize-css/fonts"),
        to: "fonts"
      }
    ]),

    // materialize
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        Hammer: "hammerjs/hammer"
    })

  ],

  module: {
    loaders: [
      // .ts files for TypeScript
      { test: /\.ts$/, loaders: ['awesome-typescript-loader', 'angular2-template-loader'] },

      // css
      { test: /\.css$/, loaders: ['to-string-loader', 'css-loader'] },

      // scss
      { test: /\.scss$/, exclude: 'node_modules', loaders: ['raw-loader', 'sass-loader'] },

      // html
      { test: /\.html$/, loader: 'raw-loader' },

      // materialise
      { test: /.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/, loader: 'url-loader?limit=100000' },
    ]
  },

  // sass-loader options
  sassLoader: {
    // add node_modules to path so we can load scss files from it
    includePaths: [path.resolve(__dirname, "./node_modules")]
  }


};


// Our Webpack Defaults
var defaultConfig = {
  devtool: 'cheap-module-source-map',
  cache: true,
  debug: true,
  output: {
    filename: 'js/[name].bundle.js',
    sourceMapFilename: 'js/[name].map',
    chunkFilename: 'js/[id].chunk.js'
  },

  resolve: {
    modulesDirectories: [
      "node_modules", 
      "dist/bower_components"
    ],
    root: [ path.join(__dirname, 'src') ],
    extensions: ['', '.ts', '.js']
  },

  devServer: {
    historyApiFallback: true,
    watchOptions: { aggregateTimeout: 300, poll: 1000 }
  },

  node: {
    global: 1,
    crypto: 'empty',
    module: 0,
    Buffer: 0,
    clearImmediate: 0,
    setImmediate: 0
  }
};

var webpackMerge = require('webpack-merge');
module.exports = webpackMerge(defaultConfig, webpackConfig);
