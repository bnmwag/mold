import { seoPlugin as plugin } from "@payloadcms/plugin-seo";
import { getServerSideURL } from "@/utils/get-url";
import type { Page } from "@/payload-types";
import { projectInfo } from "@/utils/get-project-info";

export const seoPlugin = plugin({
	generateTitle: ({ doc }: { doc: Page }) => {
		return doc?.title ? `${doc.title} :: ${projectInfo.name}` : projectInfo.name;
	},
	generateURL: ({ doc }: { doc: Page }) => {
		const url = getServerSideURL();

		return doc?.slug ? `${url}/${doc.slug}` : url;
	},
});
