"use client";
import cn from "clsx";
import type { ComponentProps } from "react";

export const GRADIENT_ANGLES = {
	top: 0,
	right: 90,
	bottom: 180,
	left: 270,
};

export type ProgressiveBlurProps = {
	direction?: keyof typeof GRADIENT_ANGLES;
	blurLayers?: number;
	className?: string;
	blurIntensity?: number;
} & ComponentProps<"div">;

const randomID = () => Math.random().toString(36).substring(2, 9);

export function ProgressiveBlur({
	direction = "bottom",
	blurLayers = 8,
	className,
	blurIntensity = 0.25,
	...props
}: ProgressiveBlurProps) {
	const layers = Math.max(blurLayers, 2);
	const segmentSize = 1 / (blurLayers + 1);

	return (
		<div className={cn("", className)}>
			{Array.from({ length: layers }).map((_, index) => {
				const angle = GRADIENT_ANGLES[direction];
				const gradientStops = [
					index * segmentSize,
					(index + 1) * segmentSize,
					(index + 2) * segmentSize,
					(index + 3) * segmentSize,
				].map((pos, posIndex) => `rgba(255, 255, 255, ${posIndex === 1 || posIndex === 2 ? 1 : 0}) ${pos * 100}%`);

				const gradient = `linear-gradient(${angle}deg, ${gradientStops.join(", ")})`;

				return (
					<div
						key={randomID()}
						className="pointer-events-none absolute inset-0 rounded-[inherit]"
						style={{
							maskImage: gradient,
							WebkitMaskImage: gradient,
							backdropFilter: `blur(${index * blurIntensity}px)`,
						}}
						{...props}
					/>
				);
			})}
		</div>
	);
}
