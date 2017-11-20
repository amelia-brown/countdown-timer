const webpack = require('webpack')
const path = require('path')
var ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");

const IS_DEVELOPMENT = process.env.NODE_ENV !== 'production'

const PATHS = {
  APP: path.resolve(__dirname, '..', 'src'),
  BUILD: path.resolve(__dirname, '..','lib'),
}

const getEntry = () => {
  let entry
  switch (IS_DEVELOPMENT) {
    case true:
      entry = {
        app: [
          'babel-polyfill',
          'react-hot-loader/patch',
          PATHS.APP
        ]
      }
      break
    case false:
    default:
      entry = {
        app: PATHS.APP,
      }
  }
  return entry
}

const getPlugins = () => {
  let plugins = [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
  switch (IS_DEVELOPMENT) {
    case true:
      plugins = plugins.concat([
        new webpack.HotModuleReplacementPlugin(),
      ])
      break
    case false:
    default:
      plugins = plugins.concat([
        new ExtractTextWebpackPlugin('bundle.css'),
        new webpack.optimize.UglifyJsPlugin({
          compress: {warnings: false},
          output: {comments: false},
          sourcemap: false,
        })
      ])
  }
  return plugins
}

let getDevServer = () => {
  let devServer
  switch (IS_DEVELOPMENT) {
    case true:
      devServer = {
        contentBase: path.resolve(__dirname, '..'),
        publicPath: '/lib/',
        port: 3000,
        inline: true,
        hot: true,
        historyApiFallback: true,
        overlay: {
          errors: true,
          warnings: true,
        },
        watchOptions: {
          aggregateTimeout: 300,
          poll: 1000
        },
      }
      break
    case false:
    default:
      devServer = {}
  }
  return devServer
}

let getCSSLoader = () => {
  let cssLoader = {
    test:/\.(scss|sass)$/,
    use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
        options: {
          importLoaders: 2,
          modules: true,
          localIdentName: '[path][name]__[local]--[hash:base64:5]',
        },
      },
      'postcss-loader',
      {
        loader: 'sass-loader',
        options: {
          includePaths: [path.resolve(__dirname, '..', 'src')],
          outputStyle: 'expanded',
        },
      },
    ],
  }
  switch (IS_DEVELOPMENT) {
    case false:
      return {
        test:/\.(scss|sass)$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                importLoaders: 2,
                modules: true,
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
              },
            },
            'postcss-loader',
              {
                loader: 'sass-loader',
                options: {
                  includePaths: [path.resolve(__dirname, '..', 'src'),],
                  outputStyle: 'expanded',
                  sourceMap: true,
                },
              },
            ]
        })
      }
    case true:
    default:
      return cssLoader
  }
}

const config = {
  entry: getEntry(),
  devtool: IS_DEVELOPMENT
    ? 'cheap-eval-source-map'
    : 'hidden-source-map',
  output: {
    path: PATHS.BUILD,
    filename: '[name].js',
    publicPath: '/lib/',
    chunkFilename: IS_DEVELOPMENT
      ? '[name].chunk.js'
      : '[name].[chunkhash:8].js',
    sourceMapFilename: IS_DEVELOPMENT
      ? '[name].js'
      : '[name].[chunkhash:8].js'
  },
  resolve: {
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.css',
      '.sass',
    ],
    modules: [
      'node_modules',
      'src'
    ],
  },
  devServer: getDevServer(),
  module: {
    rules: [
      {
        test: /\.json$/,
        use: ['json-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: IS_DEVELOPMENT
          ? ['css-loader']
          : ExtractTextWebpackPlugin.extract({
              fallback: 'style-loader',
              use: 'css-loader'
        })
      },
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, '..', 'src'),
        use: [
          'babel-loader',
          {
            loader: 'standard-loader',
            options: {
              error: true,
              parser: 'babel-eslint',
            },
          },
        ],
      },
      getCSSLoader(),
    ]
  },
  plugins: getPlugins(),
}

module.exports = config
