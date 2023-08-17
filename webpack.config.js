const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const htmlWebpachPlugin = require('html-webpack-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")

module.exports = {
   mode: 'production',
   watch: true,
   entry: {
      filename: path.resolve(__dirname, "src/script.js")
   },
   output: {
      path: path.resolve(__dirname, "dist"),
      filename: 'index.js'
   },
   plugins: [
      new MiniCssExtractPlugin({
         filename: 'index.css'
      }),
      new htmlWebpachPlugin({
         filename: 'index.html',
         template: 'src/index.html'
      })
   ],
   module: {
      rules: [
         {
            use: [{
               loader: MiniCssExtractPlugin.loader,
               options: {
                  esModule: true,
            
               }
            }, 'css-loader'],
            test: /\.css$/
         }
      ]
   },
   optimization: {
      minimizer: [
         new CssMinimizerPlugin(),
         new TerserPlugin(),
      ],
   },
   devServer: {
      port: 5000,
      compress: true,
      hot: true,
      static: {
         directory: path.join(__dirname, 'dist')
      }
   },

}
