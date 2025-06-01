const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: path.resolve(__dirname, "./src/index.tsx"),
	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: "bundle.js",
		publicPath: "/",
		clean: true,
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: "ts-loader",
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./public/index.html", // your HTML template
			filename: "index.html", // output file in dist/
		}),
	],
	mode: "development",
	devtool: "source-map",
	devServer: {
		static: {
			directory: path.join(__dirname, "public"),
		},
	},
};
