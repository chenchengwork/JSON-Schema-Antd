process.env.NODE_ENV = 'production';
process.env.BABEL_ENV = 'production';
const webpack = require("webpack");
const config = require("./webpack.config.prod");

webpack(config, (err, stats) => {
    let jsonStats = stats.toJson();
    if (jsonStats.errors.length > 0) {
        console.log("---------error-----------")
        jsonStats.errors.forEach((msg) => console.error(msg));
        return;
    }
    if (jsonStats.warnings.length > 0) {
        console.log("---------warning-----------")
        jsonStats.warnings.forEach((msg) => console.error(msg));
    }

    console.log("打包完成")
});
