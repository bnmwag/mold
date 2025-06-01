import type { Block } from "payload";

export const InteractiveVisualBreak: Block = {
	slug: "interactive-visual-break",
	fields: [
		{
			name: "media",
			type: "upload",
			relationTo: "media",
			required: true,
		},
	],
	interfaceName: "InteractiveVisualBreakBlock",
};
