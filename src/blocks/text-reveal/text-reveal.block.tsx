"use client";

import { useRef, type FC } from "react";
import type { TextRevealBlock as ITextRevealBlockProps } from "@/payload-types";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Split } from "@/components/motion/split";

export const TextRevealBlock: FC<ITextRevealBlockProps> = ({ content }) => {
	const uspContainerRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			if (!uspContainerRef.current) return;

			const words = uspContainerRef.current.querySelectorAll(".word");

			gsap.set(words, { x: "100vw" });
			gsap.to(words, {
				x: "0%",
				duration: 1,
				stagger: 0.1,
				ease: "expo.out",
				scrollTrigger: {
					trigger: uspContainerRef.current,
					start: "top 80%",
					end: "bottom 50%",
					scrub: true,
				},
			});
		},
		{ scope: uspContainerRef },
	);

	return (
		<section className="relative h-screen">
			<div className="relative h-full py-gap">
				<div className="flex h-full items-center overflow-hidden" ref={uspContainerRef}>
					<Split type="words" disableAnimation>
						<div className="dr-layout-grid">
							<h2 className="h2 | col-span-10 text-balance uppercase">{content}</h2>
						</div>
					</Split>
				</div>
			</div>
		</section>
	);
};
