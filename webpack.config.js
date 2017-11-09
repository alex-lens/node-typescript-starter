var webpack           = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  entry: {
    'app': './client/app/main.ts',
    'polyfills': [
      'core-js/es6',
      'core-js/es7/reflect',
      'zone.js/dist/zone'
    ]
  },
  output: {
    path: './dist/client',
    filename: '[name].[hash].js'
  },
  module: {
    loaders: [
      {test: /\.component.ts$/, loader: 'ts!angular2-template'},
      {test: /\.ts$/, exclude: /\.component.ts$/, loader: 'ts'},
      {test: /\.html$/, loader: 'raw'},
      {test: /\.css$/, loader: 'raw'}
    ]
  },
  resolve: {
    extensions: ['', '.ts', '.js', '.html', '.css']
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'polyfills'
    }),
    new HtmlWebpackPlugin({
      template: './client/app/index.html'
    }),
    new webpack.DefinePlugin({
      ENV:     JSON.stringify('dev'),
      API_URL: JSON.stringify('http://localhost:3000')
    })
  ]
  
};
