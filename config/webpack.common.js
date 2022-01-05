const { DefinePlugin } = require('webpack');
const resolveApp = require('../paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (isProduction) => {
  // console.log(isProduction);
  const cssFinalLoader = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';
  return {
    entry: './src/main.js', // 默认是此目录，如若文件名称或者入口变更可修改
    output: {
      path: resolveApp('dist'),
      filename: 'js/[name].[hash:6].js',
      chunkFilename: 'js/[name].chunk.[hash:4].js',
    },
    resolve: {
      extensions: ['.js', '.jsx', '.vue', '.json', '...'],
      alias: {
        '@': resolveApp('src'),
      },
    },
    externals: {
      // 不希望依赖打进包中，走外链cdn等
      // io: 'socket.io',
      // '$': 'Jquery',
      // react: 'React',
      // 'react-dom': 'ReactDOM',
      // 'prop-types': 'PropTypes',
      // moment: 'moment',
      // antd: 'antd',
      // classnames: 'classNames'
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: 'vue-loader',
        },
        {
          test: /\.(css|less)$/,
          use: [
            cssFinalLoader, // 开发与生产使用不同loader
            {
              loader: 'css-loader',
              options: {
                esModule: false, // css不使用esModule，直接输出
                importLoaders: 2, // 使用本loader前使用1个其他处理器
              },
            },
            'postcss-loader',
            'less-loader',
          ],
          sideEffects: true, // 希望保留副作用
        },
        {
          test: /\.(png|gif|jpe?g|svg|ico)$/,
          type: 'asset', // webpack5使用内置静态资源模块，且不指定具体，根据以下规则使用
          generator: {
            filename: 'img/[name].[hash:6][ext]', // ext本身会附带点，放入img目录下
          },
          parser: {
            dataUrlCondition: {
              maxSize: 10 * 1024, // 超过10kb的进行复制，不超过则直接使用base64
            },
          },
        },
        {
          test: /\.(ttf|woff2?|eot)$/,
          type: 'asset/resource', // 指定静态资源类复制
          generator: {
            filename: 'font/[name].[hash:6][ext]', // 放入font目录下
          },
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/, // 过滤掉node_modules目录，只使用而已
          use: 'babel-loader', // js、jsx使用bable-loader处理
        },
      ],
    },
    plugins: [
      new DefinePlugin({
        BASE_URL: '"./"',
      }),
      new HtmlWebpackPlugin({
        title: 'MyChat',
        template: 'public/index.html',
      }),
      new VueLoaderPlugin(),
    ],
    optimization: {
      runtimeChunk: true, // 模块抽取，利用浏览器缓存
      minimizer: [
        new TerserWebpackPlugin({
          extractComments: false, // 不要注释生成的文件
        }),
      ],
    },
  };
};
