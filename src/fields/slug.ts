import { formatSlugHook } from "@/utils/format-slug";
import type { CheckboxField, TextField } from "payload";

type Overrides = {
	slugOverrides?: Partial<TextField>;
	checkboxOverrides?: Partial<CheckboxField>;
};

type Slug = (fieldToUse?: string, overrides?: Overrides) => [TextField, CheckboxField];

export const slugField: Slug = (fieldToUse = "title", overrides = {}) => {
	const { slugOverrides, checkboxOverrides } = overrides;

	const checkBoxField: CheckboxField = {
		name: "slugLock",
		type: "checkbox",
		defaultValue: true,
		admin: {
			hidden: true,
			position: "sidebar",
		},
		...checkboxOverrides,
	};

	// Expect ts error here because of typescript mismatching Partial<TextField> with TextField
	// @ts-expect-error
	const slugField: TextField = {
		name: "slug",
		type: "text",
		index: true,
		label: "Slug",
		...(slugOverrides || {}),
		hooks: {
			// Kept this in for hook or API based updates
			beforeValidate: [formatSlugHook(fieldToUse)],
		},
		admin: {
			position: "sidebar",
			...(slugOverrides?.admin || {}),
			components: {
				Field: {
					path: "@/fields/slug.component.tsx#SlugComponent",
					clientProps: {
						fieldToUse,
						checkboxFieldPath: checkBoxField.name,
					},
				},
			},
		},
	};

	return [slugField, checkBoxField];
};
