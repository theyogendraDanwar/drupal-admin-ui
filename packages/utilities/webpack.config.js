const { resolve } = require('path');
const webpack = require('webpack');
const MinifyPlugin = require('babel-minify-webpack-plugin');

const productionPluginDefine =
  process.env.NODE_ENV === 'production'
    ? [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new MinifyPlugin(),
      ]
    : [];

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: resolve(__dirname, 'build'),
    library: '@drupal/admin-ui-utilities',
    libraryTarget: 'umd',
  },
  plugins: productionPluginDefine,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              '@babel/plugin-proposal-class-properties',
              [
                '@babel/plugin-transform-runtime',
                {
                  corejs: false,
                  helpers: true,
                  regenerator: true,
                  useESModules: false,
                },
              ],
            ],
            presets: [
              '@babel/preset-react',
              [
                '@babel/preset-env',
                {
                  targets: {
                    browsers: ['last 2 versions'],
                  },
                },
              ],
            ],
          },
        },
      },
    ],
  },
};
