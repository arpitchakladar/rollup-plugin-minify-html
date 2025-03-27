import type { Plugin } from "rollup";
import type { Options as HTMLMinifierOptions } from "html-minifier";

interface RollupPluginMinifyHTMLOptions {
	targets?: RollupPluginMinifyHTMLTargetOptions[],
	hook?: string;
	minifierOptions?: HTMLMinifierOptions;
	minifyOutput?: boolean;
};

export const minifyHTML = (options?: RollupPluginMinifyHTMLOptions) => Plugin;
