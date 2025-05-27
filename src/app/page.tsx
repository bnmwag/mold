"use client";

import FlowFieldScene from "@/components/flow-field";
import { Wrapper } from "@/components/layout/wrapper";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { Split } from "@/components/motion/split";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { NextPage } from "next";
import { useRef } from "react";

const IndexPage: NextPage = () => {
	const featuresContainerRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			if (!featuresContainerRef.current) return;

			const words = featuresContainerRef.current.querySelectorAll(".word");

			gsap.set(words, { x: "100vw" });
			gsap.to(words, {
				x: "0%",
				duration: 1,
				stagger: 0.1,
				ease: "power2.out",
				scrollTrigger: {
					trigger: featuresContainerRef.current,
					start: "top 80%",
					end: "bottom 50%",
					scrub: true,
				},
			});
		},
		{ scope: featuresContainerRef },
	);

	return (
		<Wrapper>
			<section className="relative h-[80svh] bg-primary pt-[calc(var(--gap)*2)]">
				<div className="dr-layout-grid h-full py-gap">
					<Split type="lines" delay={0.2}>
						<h1 className="dr-text-78 col-span-8 col-start-5 indent-[25%] uppercase">
							Start your next website with flow, beauty, and intention.
						</h1>
					</Split>
					<Split type="lines" delay={0.8}>
						<p className="col-span-4 col-start-1 text-balance content-end-safe">
							Mold&trade; is a modern starter template for high-end, visually rich websites. Pre configured with Next.js,
							Tailwind, Payload CMS, GSAP, and Lenis.
						</p>
					</Split>
				</div>
			</section>
			<section className="relative h-svh">
				<div className="absolute inset-0 overflow-hidden">
					<ParallaxImage src="485358570_18085681474612363_3435841613901949586_n.jpg" alt="funky man in front of red wall" />
				</div>
				<div className="absolute inset-0 overflow-hidden">
					<FlowFieldScene />
				</div>
			</section>
			<section className="relative h-screen">
				<div className="relative h-full py-gap">
					<div className="flex h-full items-center overflow-hidden" ref={featuresContainerRef}>
						<Split type="words" disableAnimation>
							<div className="dr-layout-grid">
								<h2 className="h2 | col-span-10 text-balance uppercase" data-text>
									For designers, developers, and digital makers — Mold gives you the motion, structure, and freedom to craft
									stunning websites fast.
								</h2>
							</div>
						</Split>
					</div>
				</div>
			</section>
		</Wrapper>
	);
};

export default IndexPage;
