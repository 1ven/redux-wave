const webpack = require('webpack');
const path = require('path');

const env = process.env.NODE_ENV;

const config = {
  entry: './src',
  output: {
    library: 'LibraryName',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          compilerOptions: {
            declaration: false
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env)
      }
    })
  ],
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [path.resolve(process.cwd(), "./src"), "node_modules"]
  },
};

if (env === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  );
}

module.exports = config;
