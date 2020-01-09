const path = require('path');

module.exports = {
  entry: './client/App.jsx',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'public'),
  },

  module: {
    rules: [
      {
        test: [/\.js$/, /\.jsx?$/],
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
