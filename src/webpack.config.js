const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

// console.log(process.cwd())

//设置 nodejs 中的环境变量, 默认为 production 开发环境
// process.env.NODE_ENV = 'development';
export const webpackConfig = {
  cache: false,
  entry: process.cwd() + '/app.js',
  output: {
    filename: 'bundle.js',
    path: process.cwd() + '/dist'
  },
  performance: {
    hints: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        use:[{
          loader: path.resolve(__dirname, '../node_modules/babel-loader'),
          options:{
            "presets": [path.resolve(__dirname, "../node_modules/@babel/preset-env"), path.resolve(__dirname, "../node_modules/@babel/preset-react")]
          }
        }]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition:{
            maxSize: 10 * 1024, //小于10kb转base64
          }
        },
        generator: {
          filename: 'static/images/[hash][ext][query]' //文件输出目录和命名
        }
      },
      {
        test: /\.css$/,
        //use: [path.resolve(__dirname, '../node_modules/style-loader'), path.resolve(__dirname, '../node_modules/css-loader')],
        use: [
          MiniCssExtractPlugin.loader,
          path.resolve(__dirname, '../node_modules/css-loader'), // 使用loader的默认配置
          {
            loader: path.resolve(__dirname, '../node_modules/postcss-loader'),
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env"
                  ],
                ],
              },
            },
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: process.cwd() + '/index.html',
      inject: 'head',
      minify: {   
          removeTagWhitespace: true,   
          removeComments: true, // 是否要移除注释
          removeRedundantAttributes: false, // 是否移除多余的属性
          removeEmptyAttributes: true, // 是否移除一些空属性
          useShortDoctype: true, //使用HTML5的文档声明
          collapseWhitespace: true,  //折叠空格
          removeStyleLinkTypeAttributes: true, //移除一些不必要的属性，例如link中的type=“text/css”
          keepClosingSlash: true,  //是否保存单元素尾部
          minifyCSS: true,  //是否压缩CSS
          minifyJS: {
            mangle: {
              toplevel: true
            }
          }
      }
    }),
    // new MiniCssExtractPlugin({
    //   filename: 'css/built.css'
    // })
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
  // optimization: {
  //   minimize: true,
  //   minimizer: [
  //     // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
  //     '...', 
  //     new CssMinimizerPlugin({
  //       test: /\.css$/g,
  //     }),
  //   ],
  //   splitChunks: {
  //     cacheGroups: {
  //       styles: {
  //         name: "styles",
  //         type: "css/mini-extract",
  //         chunks: "all",
  //         enforce: true,
  //       },
  //     },
  //   },
  // },
  resolve:{
    extensions:['.js', '.css', '.json']
  },
  mode: "development",
  // devServer: {
  //   // contentBase: resolve(__dirname, 'dist'),
  //   //开启 gzip 压缩
  //   compress: true,
  //   port: 9091,
  //   //open: true
  // }
};