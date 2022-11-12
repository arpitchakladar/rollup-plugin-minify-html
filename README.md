# rollup-plugin-minify-html

Minify html files with html-minifer

## Installation

```bash
# yarn
yarn add -D rollup-plugin-minify-html

# npm
npm install rollup-plugin-minify-html --save-dev
```

## Usage

```js
// rollup.config.js
import { minifyHTML } from "rollup-plugin-minify-html";

export default {
	input: "src/index.js",
	output: {
		file: "dist/bundle.js",
		format: "iife"
	},
	plugins: [
		minifyHTML({
			targets: [
				{
					src: "public/index.html",
					dest: "dist/index.html",
					minifyOptions: {
						minifyJS: true
					}
				}
			],
			minifierOptions: {
				collapseWhitespace: true,
				minifyCSS: true,
				minifyJS: false,
				minifyURLs: true
			}
		})
	]
}
```

### Configuration

The configuration options are:

#### minifierOptions

Options passed to html-minifier, that applies to all targets. See [html-minifier options](https://github.com/kangax/html-minifier#options-quick-reference).

#### targets

Type: `Array` | Default: `[]`

Array of target html files to minimize. Each target has properties:

- **src** (`string`): Path to the source html file
- **dest** (`string`): Path to the destination file
- **minifierOptions** (`Object`): Options passed to html-minifier for this target

Each target must have a **src** and a **dest**. **minifierOptions** are optional and will override the global minifierOptions for this target. See [html-minifier options](https://github.com/kangax/html-minifier#options-quick-reference).

#### hook

Type: `string` | Default: `buildEnd`

[Rollup hook](https://rollupjs.org/guide/en/#hooks) the plugin should use. By default, plugin runs when rollup has finished bundling, before bundle is written to disk.

## Original Author

[Arpit Chakladar](https://github.com/anaialar)

## License

MIT
