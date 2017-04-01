const webpack = require("webpack")
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = (env) => {
  const mode = (env && env.mode) || "dev"

  let options = {
    devtool: "source-map",
    context: path.resolve(__dirname, './src'),
    entry: "./main.js",
    //string | [string] | object { <key>: string | [string] } | (function: () => string | [string] | object { <key>: string | [string] })
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.js',
      publicPath: "" //为应用程序中的所有资源指定基本路径, 确保 publicPath 总是以斜杠(/)开头和结尾。
      // 你的包现在可以通过 http://localhost:8080/build/bundle.js 访问。
    },
    devServer: {
      contentBase: path.resolve(__dirname,"./src"),   //告诉服务器从哪里提供内容。只有当您要提供静态文件时，才需要这样做
      // clientLogLevel: "none" //控制台将始终显示捆绑包错误和警告。此选项仅影响其前的消息
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          use: [
            {loader: 'babel-loader'}
          ],
          include: [path.resolve("./src")]
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
                  localIdentName: "[name]-[local]-[hash:base64:3]"
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
                  localIdentName: "[name]-[local]-[hash:base64:3]"
                }
              },
              "less-loader",
              "postcss-loader",
            ],
        },
        {
          test: /\.css$/,
          use: mode == "production"
          ? ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader:"css-loader",
                options:{
                  modules: true,
                  localIdentName: "[name]-[local]-[hash:base64:3]"
                }
              },
              "postcss-loader",
            ],
          })
          : [
              "style-loader",
              {
                loader: "css-loader",
                options: {
                  modules: true,
                  localIdentName: "[name]-[local]-[hash:base64:3]"
                }
              },
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
              }
            }
          ]
        }


        // Loaders for other file types can go here
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: __dirname + "/src/index.html"
      }),
    ]

  }

  if(mode == "production"){
    options.plugins = options.plugins.concat([
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new ExtractTextPlugin({
        filename: "css/[name].[contenthash:4].css",
        allChunks: true,
      }),
    ])
  }
  return options
}
