const path = require("path");
const TerserPlugin = require('terser-webpack-plugin');
const glob = require('glob');

const entryFiles = glob.sync('./src/js/*.js');
const entryPoints = {};

entryFiles.forEach(file => {
    const name = path.basename(file, '.js');
    entryPoints[name] = file;
});

module.exports = {
    entry: entryPoints,
    output: {
        path: path.resolve(__dirname, "dist/js"),
        filename: "[name].min.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            }
        ]
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                test: /\.js$/,
                terserOptions: {
                    compress: true,
                    output: {
                        comments: false
                    }
                },
                extractComments: false,
                parallel: true
            })
        ]
    },
    mode: "development"
};