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
			{
				test: /\.module\.css$/,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
							modules: {
								namedExport: false,
								exportLocalsConvention: "as-is",
							},
							esModule: true,
						},
					},
				],
			},
			{
				test: /\.svg$/,
				use: ["@svgr/webpack"],
			},
			{
				test: /\.css$/,
				exclude: /\.module\.css$/,
				use: ["style-loader", "css-loader"],
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
