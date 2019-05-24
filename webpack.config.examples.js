const path = require('path');

module.exports = {
  entry: './src/examples.ts',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'examples.js',
    path: path.resolve(__dirname, 'dist')
  }
};
