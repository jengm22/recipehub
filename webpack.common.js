// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

// module.exports = {
//   entry: './app.js',
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: './views/index.ejs',
//       filename: 'index.html',
//     }),
//   ],
//   output: {
//     filename: '[name].bundle.js',
//     path: path.resolve(__dirname, 'dist'),
//     clean: true,
//   },
// };

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './app.js',
  plugins: [
    new HtmlWebpackPlugin({
      template: './views/index.ejs',
      filename: 'index.html',
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.ejs$/,
        use: ['html-loader', 'ejs-loader'],
      },
    ],
  },
};
