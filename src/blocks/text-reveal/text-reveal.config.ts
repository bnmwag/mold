import type { Block } from "payload";

export const TextReveal: Block = {
	slug: "text-reveal",
	fields: [
		{
			name: "content",
			type: "text",
			required: true,
		},
	],
	interfaceName: "TextRevealBlock",
};
