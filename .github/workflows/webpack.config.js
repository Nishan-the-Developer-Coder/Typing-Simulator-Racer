const path = require('path');

module.exports = {
  entry: './src/scripts.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: ''
  },
  mode: 'production',
  // Add loaders/plugins here if you later add transpilation, CSS handling, etc.
};
