import type { CollectionSlug } from "payload";

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
	pages: "",
};

type Props = {
	collection: keyof typeof collectionPrefixMap;
	slug: string;
};

export const genPreviewPath = ({ collection, slug }: Props) => {
	const encodedParams = new URLSearchParams({
		slug,
		collection,
		path: `${collectionPrefixMap[collection]}/${slug}`,
		previewSecret: process.env.PREVIEW_SECRET || "",
	});

	const url = `/next/preview?${encodedParams.toString()}`;

	return url;
};
