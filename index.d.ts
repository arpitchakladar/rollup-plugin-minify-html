import type { Plugin } from "rollup";
import type { Options as HTMLMinifierOptions } from "html-minifier";

interface RollupPluginMinifyHTMLTargetOptions {
	src: string;
	dest: string;
	minifierOptions: HTMLMinifierOptions
};

interface RollupPluginMinifyHTMLOptions {
	targets?: RollupPluginMinifyHTMLTargetOptions[],
	hook?: string;
	minifierOptions?: HTMLMinifierOptions
};

export const minifyHTML = (options?: RollupPluginMinifyHTMLOptions) => Plugin;
