import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "node:path";
import { buildConfig } from "payload";
import { fileURLToPath } from "node:url";

import * as Collections from "./collections";
import * as Plugins from "./plugins";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
	admin: {
		user: Collections.Users.slug,
		importMap: {
			baseDir: path.resolve(dirname),
		},
		autoLogin:
			process.env.PAYLOAD_AUTO_LOGIN === "true"
				? {
						email: process.env.PAYLOAD_AUTO_LOGIN_EMAIL || "admin@localhost",
						password: process.env.PAYLOAD_AUTO_LOGIN_PASSWORD || "admin",
						prefillOnly: true,
					}
				: undefined,
	},
	collections: Object.values(Collections),
	editor: lexicalEditor(),
	secret: process.env.PAYLOAD_SECRET || "",
	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts"),
	},
	db: mongooseAdapter({
		url: process.env.DATABASE_URI || "",
	}),
	plugins: Object.values(Plugins),
});
