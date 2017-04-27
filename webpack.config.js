const webpack = require("webpack")
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const OpenBrowserPlugin = require('open-browser-webpack-plugin')

module.exports = (env) => {
  const mode = (env && env.mode) || "dev"

  let options = {
    devtool: mode == "production" ? undefined : "source-map",  //此选项控制是否和如何生成源映射。
    context: path.resolve('src'),       //基本目录，一个绝对路径，用于从配置中解析入口点和装载程序。
    entry: [
      'react-hot-loader/patch',
      "./main.js"
    ],
    //string | [string] | object { <key>: string | [string] } | (function: () => string | [string] | object { <key>: string | [string] })
    output: {
      path: path.resolve('build'),
      filename: mode === "production" ? 'bundle.[chunkhash:4].js' : "bundle.js",
      publicPath: "" //为应用程序中的所有资源指定基本路径。
      // 你的包现在可以通过 http://localhost:8080/build/bundle.js 访问。
    },
    devServer: { //Webpack提供一个本地开发服务器，这个本地服务器基于node.js构建
      contentBase: path.resolve("src"),   //为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录,
      hot: true,
      // clientLogLevel: "none" //控制台将始终显示捆绑包错误和警告。此选项仅影响其前的消息
    },

    module: { //这些选项决定了项目中不同类型的模块将被如何处理。
      rules: [
        {
          test: /\.js$/,
          use: [
            {loader: 'babel-loader'}
          ],
          include: [path.resolve("src")]
        },
        {
          test: /.less$/,
          use: mode == "production"
          ? ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader:"css-loader",
                options:{
                  modules: true,
                  localIdentName: "[name]-[local]-[hash:base64:3]",
                  minimize: true,
                  sourceMap: false
                }
              },
              "less-loader",
              "postcss-loader",
            ],
          })
          : [
              "style-loader",
              {
                loader: "css-loader",
                options: {
                  modules: true,
                  localIdentName: "[name]-[local]-[hash:base64:3]",
                }
              },
              "less-loader",
              "postcss-loader",
            ],
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: "url-loader",
              options: {
                name: "images/[name].[ext]",
                limit: 10000,
                /*
                *  limit=10000 ： 10kb
                *  图片大小小于10kb 采用内联的形式，否则输出图片.
                *  于临界值的时候，字体或者图片文件会以base64的形式在html引用，否则则是以资源路径的形式引用。
                * */
              }
            }
          ]
        },
        {
          test: /\.(eot|ttf|svg|woff|woff2)$/,
          use: [
            {
              loader: "url-loader",
              options: {
                name: "fonts/[name].[ext]",
                limit: 5000,
              }
            }
          ]
        }


        // Loaders for other file types can go here
      ],
    },

    plugins: [ //生产 开发环境都需要的插件
      new HtmlWebpackPlugin({
        template: "index.html"
      }),
    ]

  }

  if(mode === "production"){ //生产
    options.plugins = options.plugins.concat([
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new ExtractTextPlugin({
        filename: "[name].[contenthash:4].css",
        allChunks: true
      }),
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify("production"),
        __DEBUG__: false,
      }),
    ])
  }else{ //开发
    options.plugins = options.plugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new OpenBrowserPlugin({url: 'http://localhost:8080'})
    ])
    options.entry = options.entry.concat([
      // 'react-hot-loader/patch',
      // activate HMR for React

      'webpack-dev-server/client?http://localhost:8080',
      // bundle the client for webpack-dev-server
      // and connect to the provided endpoint

      'webpack/hot/only-dev-server',
      // bundle the client for hot reloading
      // only- means to only hot reload for successful updates
    ])
  }
  return options
}
