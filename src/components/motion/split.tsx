"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cloneElement, useRef, type FC, Children } from "react";

gsap.registerPlugin(SplitText, ScrollTrigger);

interface ISplitProps extends React.HTMLAttributes<HTMLDivElement> {
	animationOnScroll?: boolean;
	disableAnimation?: boolean;
	delay?: number;
	start?: string;
	markers?: boolean;
	type?: "lines" | "words" | "chars";
}

export const Split: FC<ISplitProps> = ({
	children,
	animationOnScroll = false,
	disableAnimation = false,
	delay = 0,
	start = "top 75%",
	type = "lines",
	markers = false,
}) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const elementRef = useRef([]);
	const splitRef = useRef<SplitText[]>([]);
	const linesRef = useRef<HTMLDivElement[]>([]);

	useGSAP(
		() => {
			if (!containerRef.current) return;

			splitRef.current = [];
			elementRef.current = [];
			linesRef.current = [];

			let elements = [];
			if (containerRef.current.hasAttribute("data-split-wrapper")) {
				elements = Array.from(containerRef.current.children);
			} else {
				elements = [containerRef.current];
			}

			for (const element of elements) {
				//@ts-ignore
				elementRef.current.push(element);

				const split = SplitText.create(element, {
					type,
					mask: "lines",
					wordsClass: "word++",
					charsClass: "char++",
					linesClass: "line++",
				});

				splitRef.current.push(split);

				const { textIndent } = getComputedStyle(element);

				if (textIndent && textIndent !== "0px") {
					if (split.lines.length > 0) {
						//@ts-ignore
						split.lines[0].style.paddingLeft = textIndent;
					}
					//@ts-ignore
					element.style.textIndent = "0";
				}

				//@ts-ignore
				linesRef.current.push(...split.lines);
			}

			if (disableAnimation) return;

			gsap.set(linesRef.current, { y: "100%" });
			containerRef.current.removeAttribute("data-hidden-on-init");

			const animation = {
				y: "0%",
				duration: 1,
				stagger: 0.1,
				ease: "expo.out",
				delay,
			};

			if (animationOnScroll) {
				gsap.to(linesRef.current, {
					...animation,
					scrollTrigger: {
						trigger: containerRef.current,
						start,
						markers,
						once: true,
					},
				});
			} else {
				gsap.to(linesRef.current, animation);
			}

			return () => {
				for (const split of splitRef.current) {
					if (split) split.revert();
				}
			};
		},
		{
			scope: containerRef,
			dependencies: [animationOnScroll, delay],
		},
	);

	if (Children.count(children) === 1) {
		//@ts-ignore
		return cloneElement(children, { ref: containerRef, "data-hidden-on-init": !disableAnimation });
	}

	return (
		<div ref={containerRef} data-split-wrapper data-hidden-on-init={!disableAnimation}>
			{children}
		</div>
	);
};
