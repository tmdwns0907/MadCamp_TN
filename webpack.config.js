const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

var fileExtensions = ["jpg", "jpeg", "png", "gif", "eot", "otf", "svg", "ttf", "woff", "woff2"];

const config = {
    entry: {
        popup: "./src/index.js",
        background: "./src/middle/background.js",
        content: "./src/middle/content.js",
        StickyNote: "./src/pages/js/StickyNote.js"
    },
    output: {
        path: path.resolve(__dirname + "/build"),
        filename: "[name].bundle.js"
    },
    devServer: {
        contentBase: path.resolve("./build"),
        index: "index.html",
        port: 9000
    },
    mode: "none",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: "/node_modules",
                use: ['babel-loader'],
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true }
                    }
                ]
            },
            {
                test: new RegExp('\.(' + fileExtensions.join('|') + ')$'),
                loader: "file-loader?name=[name].[ext]",
                exclude: "/node_modules"
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './public/index.html',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                from: "public/manifest.json",
                transform: function (content, path) {
                    // generates the manifest file using the package.json informations
                    return Buffer.from(JSON.stringify({
                        //description: process.env.npm_package_description,
                        //version: process.env.npm_package_version,
                        ...JSON.parse(content.toString())
                    }))
                }
            },
            /*
            {
                from: 'node_modules/webextension-polyfill/dist/browser-polyfill.js'
            },
            {
                from: 'public/static',
            },
            */
        ]),
    ]
};

module.exports = config;