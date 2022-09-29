import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'

module.exports = {
  entry: path.resolve(__dirname, '.', './src/index.tsx'),
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts'],
  },
  mode:'development',
  devServer: {
    port: 3000
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.(s(a|c)ss)$/,
        use: ['style-loader','css-loader', 'sass-loader'],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack','url-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: 'asset/inline',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, '.', './build'),
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '.', './public/index.html'),
    }),
    new webpack.DefinePlugin({
        process: {env: {}}
    })
  ],
}

