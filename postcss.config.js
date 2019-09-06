module.exports = ({ file, options }) => ({
	parser: file.extname === '.sss' ? 'sugarss' : false,
	plugins: {
		"postcss-import": { root: file.dirname },
    "postcss-preset-env": options["postcss-preset-env"] ? options["postcss-preset-env"] : false,
		"cssnano": options.mode === "production" ? options.cssnano : false,
		"postcss-nested": {},
	}
});
