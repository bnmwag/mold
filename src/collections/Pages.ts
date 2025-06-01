import { access } from "@/access";
import { genPreviewPath } from "@/utils/gen-preview-path";
import type { CollectionConfig } from "payload";
import { MetaDescriptionField, MetaImageField, MetaTitleField, OverviewField, PreviewField } from "@payloadcms/plugin-seo/fields";
import { slugField } from "@/fields/slug";
import { baseBlocks } from "@/blocks";
import { FixedToolbarFeature, HeadingFeature, InlineToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical";

export const Pages: CollectionConfig = {
	slug: "pages",
	access: {
		create: access.authenticated,
		delete: access.authenticated,
		read: access.authenticatedOrPublished,
		update: access.authenticated,
	},
	defaultPopulate: {
		title: true,
		slug: true,
	},
	admin: {
		defaultColumns: ["title", "slug", "updatedAt"],
		livePreview: {
			url: ({ data, req }) =>
				genPreviewPath({
					slug: typeof data?.slug === "string" ? data.slug : "",
					collection: "pages",
					req,
				}),
		},
		preview: (data, { req }) =>
			genPreviewPath({
				slug: typeof data?.slug === "string" ? data.slug : "",
				collection: "pages",
				req,
			}),
		useAsTitle: "title",
	},
	fields: [
		{
			name: "title",
			type: "text",
			required: true,
		},
		{
			type: "tabs",
			tabs: [
				{
					label: "Hero",
					fields: [
						{
							name: "hero",
							type: "group",
							fields: [
								{
									name: "type",
									type: "select",
									defaultValue: "low-impact",
									label: "Type",
									options: [
										{
											label: "None",
											value: "none",
										},
										{
											label: "High Impact",
											value: "high-impact",
										},
										{
											label: "Low Impact",
											value: "low-impact",
										},
									],
									required: true,
								},
								{
									name: "title",
									type: "text",
									admin: {
										condition: (_, siblingData) => Boolean(siblingData?.type !== "none"),
									},
									label: "Heading",
								},
								{
									name: "content",
									type: "text",
									admin: {
										condition: (_, siblingData) => Boolean(siblingData?.type !== "none"),
									},
									label: "Content",
								},
							],
						},
					],
				},
				{
					label: "Content",
					fields: [
						{
							name: "layout",
							type: "blocks",
							blocks: baseBlocks,
							required: true,
						},
					],
				},
				{
					name: "meta",
					label: "SEO",
					fields: [
						OverviewField({
							titlePath: "meta.title",
							descriptionPath: "meta.description",
							imagePath: "meta.image",
						}),
						MetaTitleField({ hasGenerateFn: true }),
						MetaImageField({ relationTo: "media" }),
						MetaDescriptionField({}),
						PreviewField({
							hasGenerateFn: true,
							titlePath: "meta.title",
							descriptionPath: "meta.description",
						}),
					],
				},
			],
		},
		{
			name: "publishedAt",
			type: "date",
			admin: {
				position: "sidebar",
			},
		},
		...slugField(),
	],
	versions: {
		drafts: {
			autosave: {
				interval: 100, // We set this interval for optimal live preview
			},
			schedulePublish: true,
		},
		maxPerDoc: 50,
	},
};
