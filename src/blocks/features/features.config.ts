import type { Block } from "payload";

export const Features: Block = {
	slug: "features",
	fields: [
		{
			labels: {
				singular: "Feature",
				plural: "Features",
			},
			name: "items",
			type: "array",
			fields: [
				{
					name: "empty",
					admin: {
						description: "Check to create an empty space in the grid between features.",
					},
					label: "Set as empty",
					type: "checkbox",
				},
				{
					name: "title",
					type: "text",
					admin: {
						condition: (_, siblingData) => Boolean(!siblingData?.empty),
					},
				},
				{
					name: "description",
					type: "text",
					admin: {
						condition: (_, siblingData) => Boolean(!siblingData?.empty),
					},
				},
			],
		},
	],
	interfaceName: "Features",
};
