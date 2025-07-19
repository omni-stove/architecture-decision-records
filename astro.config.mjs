// @ts-check

import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	site: "https://adr.omnistove.com",
	output: "static",
	integrations: [
		starlight({
			title: "Architecture Decision Records",
			social: [
				{
					icon: "github",
					label: "GitHub",
					href: "https://github.com/omni-stove/architecture-decision-records",
				},
			],
			sidebar: [{ label: "Common", autogenerate: { directory: "common" } }],
		}),
	],
});
