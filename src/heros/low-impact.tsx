"use client";

import { Fragment, useRef, type FC } from "react";
import type { Page } from "@/payload-types";
import gsap from "gsap";
import { Split } from "@/components/motion/split";
import { randId } from "@/lib/utils";
import { useEntryAnimation } from "@/lib/transitions";

export const LowImpact: FC<Page["hero"]> = ({ content, title }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const marqueeRef = useRef<HTMLDivElement>(null);

	useEntryAnimation(
		() => {
			if (!marqueeRef.current) return;

			const marqueeElements = marqueeRef.current.querySelectorAll(".marquee__element");

			gsap.to(marqueeRef.current, {
				x: "-33.3333%",
				duration: 5,
				repeat: -1,
				ease: "none",
			});

			gsap.set(marqueeElements, { y: "100%" });
			gsap.to(marqueeElements, {
				y: "0%",
				duration: 1,
				stagger: 0.1,
				ease: "expo.out",
			});
		},
		{ scope: containerRef },
	);

	return (
		<section className="relative py-[calc(var(--gap)*4)]">
			{/* <style jsx>{`
				.marquee__element {
					will-change: transform;
					transform: translateY(100%);
				}
			`}</style> */}
			<div className="overflow-hidden">
				<div className="marquee | flex w-fit items-center" ref={marqueeRef}>
					{Array.from({ length: 3 }).map((_, index) => (
						<Fragment key={randId()}>
							<h1 className="marquee__element | whitespace-nowrap text-[12vw] uppercase">{title}</h1>
							<svg
								className="marquee__element | mx-[4vw] inline-block size-[10vw]"
								xmlns="http://www.w3.org/2000/svg"
								width="32"
								height="32"
								viewBox="0 0 24 24"
							>
								{/* Icon from Material Design Icons by Pictogrammers - https://github.com/Templarian/MaterialDesign/blob/master/LICENSE */}
								<title>triangular star</title>
								<path fill="currentColor" d="m12 2.6l-3 9.8l-7 7.5l10-2.3L22 20l-7-7.5z" />
							</svg>
						</Fragment>
					))}
				</div>
			</div>
			<div className="dr-layout-block pointer-events-none absolute inset-0 flex items-end">
				<Split delay={0.8}>
					<p className="pointer-events-auto">{content}</p>
				</Split>
			</div>
		</section>
	);
};
