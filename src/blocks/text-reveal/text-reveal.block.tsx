"use client";

import { useRef, type FC } from "react";
import type { TextRevealBlock as ITextRevealBlockProps } from "@/payload-types";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Split } from "@/components/motion/split";
import { useEntryAnimation } from "@/lib/transitions";

export const TextRevealBlock: FC<ITextRevealBlockProps> = ({ content }) => {
	const uspContainerRef = useRef<HTMLDivElement>(null);

	return (
		<section className="relative h-screen">
			<div className="relative h-full py-gap">
				<div className="flex h-full items-center overflow-hidden" ref={uspContainerRef}>
					<div className="dr-layout-grid">
						<Split type="lines" animationOnScroll>
							<h2 className="h2 | col-span-10 text-balance indent-[25%] uppercase">{content}</h2>
						</Split>
					</div>
				</div>
			</div>
		</section>
	);
};
