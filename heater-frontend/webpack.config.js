const path = require("path");

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
	plugins: [],
	mode: "development",
	devtool: "source-map",
	devServer: {
		static: {
			directory: path.join(__dirname, "public"),
		},
	},
};
