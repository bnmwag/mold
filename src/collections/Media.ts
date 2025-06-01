import { access } from "@/access";
import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
	slug: "media",
	access: {
		create: access.authenticated,
		delete: access.authenticated,
		read: access.anyone,
		update: access.authenticated,
	},
	fields: [
		{
			name: "alt",
			type: "text",
			required: true,
		},
	],
	upload: true,
};
