"use client";

import FlowFieldScene from "@/components/flow-field";
import { Wrapper } from "@/components/layout/wrapper";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { Split } from "@/components/motion/split";
import { randId } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { NextPage } from "next";
import { useRef } from "react";

const features = [
	{
		title: "performance",
		description:
			"Fast by default — Mold uses the latest web tech to deliver smooth, high-performance experiences without the bloat.",
	},
	{
		title: "motion",
		description:
			"Powered by GSAP and Lenis, every animation and scroll interaction feels fluid, expressive, and deeply intentional.",
	},
	{ empty: true },
	{
		title: "freedom",
		description:
			"Built on Next.js, Mold gives you the flexibility to build anything — from landing pages to full-scale apps, fast.",
	},
	{ empty: true },
	{
		title: "clarity",
		description: "Clean, modular code means fewer decisions, better focus, and less time fighting your own setup.",
	},
	{
		title: "scalability",
		description: "Start small or go big — Mold adapts effortlessly to projects of any size, without added complexity.",
	},
];

const IndexPage: NextPage = () => {
	const uspContainerRef = useRef<HTMLDivElement>(null);
	const featuresContainerRef = useRef<HTMLDivElement>(null);

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

	useGSAP(
		() => {
			if (!featuresContainerRef.current) return;

			const features = featuresContainerRef.current.querySelectorAll(".col-span-3");

			for (const f of features) {
				const index = Number(f.getAttribute("data-index"));

				const multiPattern = [0, 1, 2, 1];
				const multi = multiPattern[index % multiPattern.length];

				gsap.from(f, {
					y: `${multi * 500}px`,
					duration: 1,
					ease: "power1.out",
					scrollTrigger: {
						trigger: featuresContainerRef.current,
						start: "top bottom",
						end: "bottom bottom-=50%",
						scrub: true,
					},
				});
			}
		},
		{ scope: featuresContainerRef },
	);

	return (
		<Wrapper>
			<section className="relative h-[80svh] bg-primary pt-[calc(var(--gap)*2)]">
				<div className="dr-layout-grid h-full py-gap">
					<Split type="lines" delay={0.2}>
						<h1 className="dr-text-78 col-span-8 col-start-5 indent-[25%] uppercase">
							Start your next website with <mark>flow</mark>, <mark>beauty</mark>, and <mark>intention</mark>.
						</h1>
					</Split>
					<Split type="lines" delay={0.8}>
						<p className="col-span-6 col-start-1 text-balance content-end-safe">
							Mold&trade; is a modern starter template for high-end, visually rich websites. Pre configured with Next.js,
							Tailwind, Payload CMS, GSAP, and Lenis.
						</p>
					</Split>
				</div>
			</section>
			<section className="relative h-[120svh]">
				<div className="absolute inset-0 overflow-hidden">
					<ParallaxImage src="485358570_18085681474612363_3435841613901949586_n.jpg" alt="funky man in front of red wall" />
				</div>
				<div className="absolute inset-0 overflow-hidden">
					<FlowFieldScene />
				</div>
			</section>
			<section className="relative h-screen">
				<div className="relative h-full py-gap">
					<div className="flex h-full items-center overflow-hidden" ref={uspContainerRef}>
						<Split type="words" disableAnimation>
							<div className="dr-layout-grid">
								<h2 className="h2 | col-span-10 text-balance uppercase" data-text>
									For <mark>designers</mark>, <mark>developers</mark>, and <mark>digital makers</mark> — Mold gives you the
									motion, structure, and freedom to craft stunning websites fast.
								</h2>
							</div>
						</Split>
					</div>
				</div>
			</section>
			<section className="relative mb-[calc(var(--gap)*12)]">
				<div className="relative h-full py-gap">
					<div className="dr-layout-grid gap-y-[calc(var(--gap)*4)]" ref={featuresContainerRef}>
						{features.map((feature, index) =>
							feature.empty ? (
								<div className="col-span-3" key={randId()} />
							) : (
								<div
									key={feature.title}
									className="col-span-3 aspect-[3/3.5] bg-[#0f0f0f] p-gap text-secondary"
									data-index={index}
								>
									<div className="flex items-start justify-between">
										<p className="">
											FTR
											<br /> 00{index + 1}
										</p>
										<div className="size-4 bg-contrast" />
									</div>
									<div className="flex h-full flex-col justify-between py-24">
										<div className="h3">{feature.title}</div>
										<p className="indent-[25%]">{feature.description}</p>
									</div>
								</div>
							),
						)}
					</div>
				</div>
			</section>
		</Wrapper>
	);
};

export default IndexPage;
