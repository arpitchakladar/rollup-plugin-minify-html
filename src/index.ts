import path from "path";
import fs from "fs";
import { minify } from "html-minifier";
import type { Plugin } from "rollup";
import type { RollupPluginMinifyHTMLOptions } from "../index";

export const minifyHTML = (options: RollupPluginMinifyHTMLOptions = {}): Plugin => {
	const {
		targets = [],
		hook = "buildEnd",
		minifierOptions = {}
	} = options;

	return {
		name: "minify-html",
		[hook]: async () => {
			for (const target of targets) {
				if (target.src && target.dest) {
					const html = await new Promise<string>((resolve, reject) => {
						fs.readFile(target.src, (err, data) => {
							if (err) reject(err);
							resolve(data.toString("utf-8"));
						});
					});

					await new Promise<void>((resolve, reject) => {
						fs.mkdir(path.dirname(target.dest), (err) => {
							if (err) reject(err);
							resolve();
						});
					});

					await new Promise<void>((resolve, reject) => {
						fs.writeFile(target.dest, minify(html, { ...minifierOptions, ...target.minifierOptions }), (err) => {
							if (err) reject(err);
							resolve();
						});
					});
				}
			}
		}
	};
};
