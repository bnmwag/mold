import type React from "react";

import type { Page } from "@/payload-types";
import { HighImpact } from "@/heros/high-impact";
import { LowImpact } from "@/heros/low-impact";

const heroes = {
	"high-impact": HighImpact,
	"low-impact": LowImpact,
};

export const RenderHero: React.FC<Page["hero"]> = (props) => {
	const { type } = props || {};

	if (!type || type === "none") return null;

	const HeroToRender = heroes[type];

	if (!HeroToRender) return null;

	return <HeroToRender {...props} />;
};
