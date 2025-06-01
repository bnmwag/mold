import type React from "react";
import type { Page } from "@/payload-types";

import { getCachedDoc } from "@/utils/get-doc";
import { getCachedRedirects } from "@/utils/get-redirects";
import { notFound, redirect } from "next/navigation";

interface Props {
	disableNotFound?: boolean;
	url: string;
}

export const Redirects: React.FC<Props> = async ({ disableNotFound, url }) => {
	const slug = url.startsWith("/") ? url : `${url}`;

	const redirects = await getCachedRedirects()();

	const redirectItem = redirects.find((redirect) => redirect.from === slug);

	if (redirectItem) {
		if (redirectItem.to?.url) {
			redirect(redirectItem.to.url);
		}

		let redirectUrl: string;

		if (typeof redirectItem.to?.reference?.value === "string") {
			const collection = redirectItem.to?.reference?.relationTo;
			const id = redirectItem.to?.reference?.value;

			const document = (await getCachedDoc(collection, id)()) as Page;
			redirectUrl = `${redirectItem.to?.reference?.relationTo !== "pages" ? `/${redirectItem.to?.reference?.relationTo}` : ""}/${
				document?.slug
			}`;
		} else {
			redirectUrl = `${redirectItem.to?.reference?.relationTo !== "pages" ? `/${redirectItem.to?.reference?.relationTo}` : ""}/${
				typeof redirectItem.to?.reference?.value === "object" ? redirectItem.to?.reference?.value?.slug : ""
			}`;
		}

		if (redirectUrl) redirect(redirectUrl);
	}

	if (disableNotFound) return null;

	notFound();
};
