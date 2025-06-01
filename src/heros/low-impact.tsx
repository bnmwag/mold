"use client";

import { Fragment, useRef, type FC } from "react";
import type { Page } from "@/payload-types";
import gsap from "gsap";
import { Split } from "@/components/motion/split";
import { randId } from "@/lib/utils";
import { useGSAP } from "@gsap/react";

export const LowImpact: FC<Page["hero"]> = ({ content, title }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const marqueeRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			if (!marqueeRef.current) return;

			const marqueeElements = marqueeRef.current.querySelectorAll(".marquee__element");

			gsap.set(marqueeElements, { y: "100%" });
			setTimeout(() => {
				gsap.to(marqueeElements, {
					y: "0%",
					duration: 1,
					stagger: 0.1,
					ease: "expo.out",
				});
			}, 1000);
		},
		{ scope: containerRef },
	);

	return (
		<section className="relative py-[calc(var(--gap)*4)]">
			<div className="overflow-hidden">
				<div className="marquee | flex w-fit items-center" ref={marqueeRef}>
					{Array.from({ length: 3 }).map((_, index) => (
						<Fragment key={randId()}>
							<h1 className="marquee__element | whitespace-nowrap text-[12vw] uppercase">{title}</h1>
							<svg
								className="marquee__element | inline-block size-[10vw] mx-[4vw]"
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
			<div className="absolute inset-0 dr-layout-block flex items-end pointer-events-none">
				<Split delay={0.8}>
					<p className="pointer-events-auto">{content}</p>
				</Split>
			</div>
		</section>
	);
};
