/**
 * @description webpack 开发配置
 */
const webpackMerge = require("webpack-merge");
const baseConfig = require("./webpack.config.base");

module.exports = webpackMerge(baseConfig, {
    devtool: 'cheap-module-source-map',	// cheap-module-source-map,cheap-source-map
    mode: 'development',
});
