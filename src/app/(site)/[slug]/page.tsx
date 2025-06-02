import type { Metadata } from "next";

import { Redirects } from "@/components/layout/redirects";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import { draftMode } from "next/headers";
import React, { cache } from "react";

import { RenderBlocks } from "@/components/render/render-blocks";
import { generateMeta } from "@/utils/gen-meta";
import { redirect } from "next/navigation";
import { Wrapper } from "@/components/layout/wrapper";
import { RenderHero } from "@/components/render/render-hero";
import Link from "next/link";
import { PageClient } from "./page.client";

export async function generateStaticParams() {
	const payload = await getPayload({ config: configPromise });
	const pages = await payload.find({
		collection: "pages",
		draft: false,
		limit: 1000,
		overrideAccess: false,
	});

	const params = pages.docs
		?.filter((doc) => {
			return doc.slug !== "home";
		})
		.map(({ slug }) => {
			return { slug };
		});

	return params;
}

type Args = {
	params: Promise<{
		slug?: string;
	}>;
};

export default async function Page({ params: paramsPromise }: Args) {
	const { slug } = await paramsPromise;

	if (slug === "home") {
		return redirect("/");
	}

	const url = `/${slug}`;

	const page = await queryPage({
		slug: slug || "home",
	});

	if (!page) {
		const payload = await getPayload({ config: configPromise });

		const pagesCount = await payload.find({
			collection: "pages",
			draft: false,
			limit: 0,
			pagination: false,
		});

		if (pagesCount.totalDocs === 0) {
			return (
				<div className="flex h-screen flex-col items-center justify-center gap-4">
					<p className="text-2xl">No pages found</p>
					<p className="text-[#666] text-sm">Please create a page in Payload first.</p>
					<Link href="/admin/collections/pages" className="text-sm underline">
						Go to Payload
					</Link>
				</div>
			);
		}

		return <Redirects url={url} />;
	}

	const { hero, layout } = page;

	return (
		<Wrapper>
			<Redirects disableNotFound url={url} />

			<RenderHero {...hero} />
			<RenderBlocks blocks={layout} />
			<PageClient />
		</Wrapper>
	);
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
	const { slug = "home" } = await params;
	const page = await queryPage({
		slug,
	});

	return generateMeta({ doc: page });
}

const queryPage = cache(async ({ slug }: { slug: string }) => {
	const { isEnabled: draft } = await draftMode();

	const payload = await getPayload({ config: configPromise });

	const result = await payload.find({
		collection: "pages",
		draft,
		limit: 1,
		overrideAccess: draft,
		where: {
			slug: {
				equals: slug,
			},
		},
	});

	return result.docs?.[0] || null;
});
