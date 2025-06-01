"use client";

import type { FC } from "react";
import type { InteractiveVisualBreakBlock as IInteractiveVisualBreakBlockProps } from "@/payload-types";
import FlowFieldScene from "@/components/flow-field";
import { ParallaxImage } from "@/components/motion/parallax-image";

export const InteractiveVisualBreakBlock: FC<IInteractiveVisualBreakBlockProps> = ({ media }) => {
	return (
		<section className="relative h-[120svh]">
			<div className="absolute inset-0 overflow-hidden">
				<ParallaxImage media={media} />
			</div>
			<div className="absolute inset-0 overflow-hidden">
				<FlowFieldScene />
			</div>
		</section>
	);
};
