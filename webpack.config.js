"use strict";

const path = require("path");
const webpack = require("webpack");
const argv = require("yargs").argv;

/*plugins
=====================================*/
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");

/*config clean-webpack-plugin
=====================================*/
const pathsToClean = [
  "dist",
  "build",
  "public",
];

const cleanOptions = {
  // exclude:  ['shared.js'],
  verbose:  true,
  dry:      false
};

module.exports = {
	entry: {
		index: "./src/index.js",
	},
	output: {
		path: path.resolve(__dirname, "public"),
		filename: 'js/[name].[hash].js',
		publicPath: "/"
	},

	devtool: argv.mode === "development" ? "source-map" : false,

	module: {
		rules: [
			{
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve("babel-loader"),
            options: {
              cacheDirectory: true,
            }
          }
        ]
      },
      
      {
      	test: /\.(jpe?g|png|gif|svg|mp4)$/,
      	exclude: [
      		path.resolve(__dirname, './node_modules'),
        ],
        
      	use: [
      		{
      			loader: 'file-loader',
      			options: {
      				name: "[name].[ext]",
              publicPath: 'assets/img/',
              outputPath: 'assets/img/'
      			}
          },
          
          {
            loader: "image-webpack-loader",
            options: {
              disable: true,
              mozjpeg: {
                progressive: true,
                quality: 70
              },
              pngquant: {
                quality: "65-90",
                speed: 4
              },
            }
          }
      	]
      },

      {
        test: /\.(woff|woff2|ttf)$/,
        use: [{
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            publicPath: 'assets/fonts/',
            outputPath: 'assets/fonts/'
          }
        }]
      },

      {
        test: /\.svg$/,
        use: [{
          loader: "svg-sprite-loader",
          options: {
            publicPath: "/",
            extract: true,
            spriteFilename: "assets/sprite/sprite.svg",
          }
        }]
      },

      {
        test: /\.(css|pcss)?$/,
        exclude: /node_modules/,
        use: [
          argv.mode !== "production" ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {importLoaders: 1},
          },

          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              config: {
                path: __dirname + "/postcss.config/",
                ctx: {
                  mode: argv.mode,
                  cssnano: {
                    "preset": [
                      "default",
                      {"discardComments": {"removeAll": true}}
                    ]
                  },
                  "postcss-preset-env": {
                    autoprefixer: { grid: true },
                    browsers: 'last 2 versions',
                    stage: 3,
                    features: {
                      "nesting-rules": true
                    }
                  }
                }
              }
            }
          }
        ]
      },

      {
        test: /\.css$/,
        loader: "style-loader!css-loader",
      }
		]
	},

	plugins: [
	new HtmlWebpackPlugin({
    filename: "index.html",
    template: "./src/index.html",
  }),
		new CleanWebpackPlugin(pathsToClean, cleanOptions),
		new MiniCssExtractPlugin({
      filename: argv.mode === "production" ? "css/[name].[contenthash].css" : "css/[name].css",
      chunkFilename: "[name].css",
    }),
    new SpriteLoaderPlugin({
      plainSprite: true
    })
	],

	devServer: {
    contentBase: "./public",
    compress: true,
    port: 8080,
    host: "localhost",
  },
};
