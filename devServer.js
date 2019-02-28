/**
 * Created by chencheng on 16-11-17.
 */
process.env.NODE_ENV = 'development';
process.env.BABEL_ENV = 'development';
const path = require("path");
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConf = require("./webpack.config");

/**
 *
 * @param params
 * usage:
 * 参数说明:
 * 	params = {
 * 		config: "webpack配置",						// 必填
 * 		contentBase: "提供静态文件的目录, 绝对路径",		// 必填
 * 		publicPath: "主机名称",						// 可选
 * 		host: "主机名称",								// 可选
 * 		port: "服务端口",								// 可选
 * 	}
 */
const config = webpackConf;
const contentBase = path.resolve(__dirname, "./playground");
const publicPath ="/public/";
const host = "localhost";
const port = 8000;

// webpack 自动重新加载，采用inline
Object.keys(config.entry).forEach(key => {
    if (!Array.isArray(config.entry[key])){
        config.entry[key] = [config.entry[key]];
    }

    config.entry[key].push('webpack-dev-server/client?http://' + host + ':' + port + '/')
});

// 启动服务
const server = new WebpackDevServer(webpack(config), {
    publicPath,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
    },

    // 指定服务器内容指定目录
    contentBase,

    watchContentBase: true,

    // 对于某些系统，监听大量文件系统会导致大量的 CPU 或内存占用,这个选项可以排除一些巨大的文件夹
    watchOptions: {
        ignored: /node_modules/
    },

    // 开启服务器的模块热替换(HMR)
    hot: false,

    // 当请求不存在的路由时，直接返回首页
    historyApiFallback: {
        index: publicPath,
        disableDotRule: true,
    },

    stats: {
        colors: true,
    },
    proxy: {}
});

// 将其他路由，全部返回index.html
server.app.get('*', (req, res) => {
    res.sendFile(`${contentBase}/index.html`);
});

console.log('http://' + host + ':' + port);

server.listen(port, host);




