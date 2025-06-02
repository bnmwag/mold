"use client";

import type { FC } from "react";
import type { Page } from "@/payload-types";
import { Split } from "@/components/motion/split";

export const HighImpact: FC<Page["hero"]> = ({ content, title }) => {
	return (
		<section className="relative h-[80svh] bg-primary pt-[calc(var(--gap)*2)]">
			<div className="dr-layout-grid h-full py-gap">
				<Split type="lines" delay={0.25}>
					<h1 className="dr-text-78 col-span-8 col-start-5 indent-[25%] uppercase">{title}</h1>
				</Split>
				<Split type="lines" delay={0.5}>
					<p className="col-span-6 col-start-1 text-balance content-end-safe">{content}</p>
				</Split>
			</div>
		</section>
	);
};
