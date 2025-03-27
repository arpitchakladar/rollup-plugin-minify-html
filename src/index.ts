import path from "path";
import fs from "fs/promises";
import { minify } from "html-minifier";
import type { Plugin } from "rollup";
import type { RollupPluginMinifyHTMLOptions } from "../index";

export const minifyHTML = (options: RollupPluginMinifyHTMLOptions = {}): Plugin => {
	const {
		targets = [],
		hook = "buildEnd",
		minifierOptions = {},
		minifyOutput = true, // Toggle for final output minification
	} = options;

	return {
		name: "minify-html",

		// Optimize the specified HTML files before copying
		[hook]: async () => {
			for (const target of targets) {
				if (target.src && target.dest) {
					try {
						const html = await fs.readFile(target.src, "utf-8");

						// Ensure destination directory exists
						await fs.mkdir(path.dirname(target.dest), { recursive: true });

						// Minify and write HTML file
						await fs.writeFile(
							target.dest,
							minify(html, { ...minifierOptions, ...target.minifierOptions })
						);
					} catch (error) {
						console.error(`Error processing ${target.src}:`, error);
					}
				}
			}
		},

		// Optimize all HTML files in the final Rollup output directory (if enabled)
		generateBundle: async (_, bundle) => {
			if (!minifyOutput) return; // Skip if disabled

			for (const [fileName, file] of Object.entries(bundle)) {
				if (file.type === "asset" && fileName.endsWith(".html") && "source" in file) {
					try {
						file.source = minify(file.source.toString(), minifierOptions);
					} catch (error) {
						console.error(`Error minifying ${fileName}:`, error);
					}
				}
			}
		}
	};
};
