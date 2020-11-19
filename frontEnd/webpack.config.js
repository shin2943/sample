const webpack = require('webpack'); // plugin
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
let enabledSourceMap = false;

if (process.env.NODE_ENV == 'development') {
    enabledSourceMap = true;
    module.exports.devtool = 'inline-source-map';
}

module.exports = {
  entry: './src/js/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js'
  },
  resolve: {
    alias: {
        vue$: 'vue/dist/vue.esm.js',
      },
      extensions: ['*', '.vue', '.js', '.json'],
  },
  module: {
    rules: [
      {
        
          test:  /\.(sc|sa|c)ss$/,
          use:[
            MiniCssExtractPlugin.loader,
            {
                // convert css to js
                loader: 'css-loader',
                options: {
                    sourceMap: enabledSourceMap,
                    importLoaders: 2,
                },
            },
            {
                // convert sass to css
                loader: 'sass-loader',
                options: {
                    sourceMap: enabledSourceMap,
                },
            }
          ]
      },
      { 
          test: /\.vue?$/, 
          loader: 'vue-loader',
            options: {
                extractCSS: true
              }
            }
    ]
  },
  plugins: [new VueLoaderPlugin(),new MiniCssExtractPlugin({
    filename: 'styles/bundle.css'
  })],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist')
}
}