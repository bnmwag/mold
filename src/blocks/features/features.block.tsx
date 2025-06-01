"use client";

import { useRef, type FC } from "react";
import type { Features as IFeaturesBlockProps } from "@/payload-types";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const FeaturesBlock: FC<IFeaturesBlockProps> = ({ items }) => {
	const featuresContainerRef = useRef<HTMLDivElement>(null);

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
		<section className="relative mb-[calc(var(--gap)*12)]">
			<div className="relative h-full py-gap">
				<div className="dr-layout-grid gap-y-[calc(var(--gap)*4)]" ref={featuresContainerRef}>
					{items?.map((feature, index) =>
						feature.empty ? (
							<div className="col-span-3" key={feature.id} />
						) : (
							<div key={feature.title} className="col-span-3 aspect-[3/3.5] bg-[#0f0f0f] p-gap text-secondary" data-index={index}>
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
	);
};
