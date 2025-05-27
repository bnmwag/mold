"use client";

import { useEffect, useRef, type FC } from "react";
import cn from "clsx";
import { lerp } from "@/lib/utils";
import { useLenis } from "lenis/react";

interface IParallaxImageProps extends React.HTMLAttributes<HTMLImageElement> {
	src: string;
	alt: string;
}

export const ParallaxImage: FC<IParallaxImageProps> = ({ src, className, alt, ...props }) => {
	const imageRef = useRef<HTMLImageElement>(null);
	const bounds = useRef<{ top: number; bottom: number } | null>(null);
	const currentTranslateY = useRef(0);
	const targetTranslateY = useRef(0);
	const rafId = useRef<number | null>(null);

	useEffect(() => {
		const updateBounds = () => {
			if (!imageRef.current) return;
			const rect = imageRef.current.getBoundingClientRect();
			bounds.current = {
				top: rect.top + window.scrollY,
				bottom: rect.bottom + window.scrollY,
			};
		};

		updateBounds();
		window.addEventListener("resize", updateBounds);

		const animate = () => {
			if (!imageRef.current) return;

			currentTranslateY.current = lerp(currentTranslateY.current, targetTranslateY.current, 0.1);

			if (Math.abs(currentTranslateY.current - targetTranslateY.current) > 0.01) {
				imageRef.current.style.transform = `translateY(${currentTranslateY.current}px) scale(1.25)`;
			}

			rafId.current = requestAnimationFrame(animate);
		};

		animate();

		return () => {
			window.removeEventListener("resize", updateBounds);
			if (rafId.current) {
				cancelAnimationFrame(rafId.current);
			}
		};
	});

	useLenis(({ scroll }) => {
		if (!bounds.current) return;
		const relativeScroll = scroll - bounds.current.top;
		targetTranslateY.current = relativeScroll * 0.2;
	});

	return (
		<img
			src={src}
			ref={imageRef}
			{...props}
			alt={alt}
			className={cn("absolute h-full w-full object-cover will-change-transform", className)}
			style={{
				willChange: "transform",
				transform: "translateY(0) scale(1.25)",
			}}
		/>
	);
};
