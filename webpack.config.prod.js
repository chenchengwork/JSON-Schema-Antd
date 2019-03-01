/**
 * @description webpack 生产配置
 */
const path = require("path");
const webpackMerge = require("webpack-merge");
const baseConfig = require("./webpack.config.base");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = webpackMerge(baseConfig, {
    devtool: false,
    mode: 'production',
    output: {
        path: path.resolve(__dirname, "playground/build")
    },
    plugins: [
        new OptimizeCSSAssetsPlugin({})
    ],
    optimization: {
        // 代码分割策略配置
        splitChunks: {
            cacheGroups: {}
        },
        minimize: true,
    }
});
