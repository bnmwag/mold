import cn from "clsx";
import NextImage from "next/image";
import type { StaticImageData } from "next/image";
import { forwardRef, Fragment, useEffect, useRef, type ElementType, type Ref } from "react";

import type { Media as MediaType } from "@/payload-types";
import { getMediaUrl } from "@/utils/get-media-url";

export interface Props {
	alt?: string;
	className?: string;
	fill?: boolean; // for NextImage only
	htmlElement?: ElementType | null;
	pictureClassName?: string;
	imgClassName?: string;
	onClick?: () => void;
	onLoad?: () => void;
	loading?: "lazy" | "eager"; // for NextImage only
	priority?: boolean; // for NextImage only
	ref?: Ref<HTMLImageElement | HTMLVideoElement | null>;
	resource?: MediaType | string | number | null; // for Payload media
	size?: string; // for NextImage only
	src?: StaticImageData; // for static media
	videoClassName?: string;
	style?: React.CSSProperties;
}

const breakpoints = {
	"3xl": 1920,
	"2xl": 1536,
	xl: 1280,
	lg: 1024,
	md: 768,
	sm: 640,
};

const placeholderBlur =
	"data:image/png;base64,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";

export const Media = forwardRef<HTMLDivElement, Props>(function Media(props, ref) {
	const { className, resource, style } = props;

	const isVideo = typeof resource === "object" && resource?.mimeType?.includes("video");

	return (
		<div ref={ref} style={style} className={cn("relative", className)}>
			{isVideo ? <VideoMedia {...props} /> : <ImageMedia {...props} />}
		</div>
	);
});

export const VideoMedia: React.FC<Props> = (props) => {
	const { onClick, resource, videoClassName } = props;

	const videoRef = useRef<HTMLVideoElement>(null);
	// const [showFallback] = useState<boolean>()

	useEffect(() => {
		const { current: video } = videoRef;
		if (video) {
			video.addEventListener("suspend", () => {
				// setShowFallback(true);
				// console.warn('Video was suspended, rendering fallback image.')
			});
		}
	}, []);

	if (resource && typeof resource === "object") {
		const { filename } = resource;

		return (
			// biome-ignore lint/a11y/useKeyWithClickEvents: <video> elements don't need to be in a button
			<video autoPlay className={cn(videoClassName)} controls={false} loop muted onClick={onClick} playsInline ref={videoRef}>
				<source src={getMediaUrl(`/media/${filename}`)} />
			</video>
		);
	}

	return null;
};

export const ImageMedia: React.FC<Props> = (props) => {
	const {
		alt: altFromProps,
		fill,
		pictureClassName,
		imgClassName,
		priority,
		resource,
		size: sizeFromProps,
		src: srcFromProps,
		loading: loadingFromProps,
	} = props;

	let width: number | undefined;
	let height: number | undefined;
	let alt = altFromProps;
	let src: StaticImageData | string = srcFromProps || "";

	if (!src && resource && typeof resource === "object") {
		const { alt: altFromResource, height: fullHeight, url, width: fullWidth } = resource;

		width = fullWidth!;
		height = fullHeight!;
		alt = altFromResource || "";

		const cacheTag = resource.updatedAt;

		src = getMediaUrl(url, cacheTag);
	}

	const loading = loadingFromProps || (!priority ? "lazy" : undefined);

	// NOTE: this is used by the browser to determine which image to download at different screen sizes
	const sizes = sizeFromProps
		? sizeFromProps
		: Object.entries(breakpoints)
				.map(([, value]) => `(max-width: ${value}px) ${value * 2}w`)
				.join(", ");

	return (
		<picture className={cn(pictureClassName)}>
			<NextImage
				alt={alt || ""}
				className={cn(imgClassName)}
				fill={fill}
				height={!fill ? height : undefined}
				placeholder="blur"
				blurDataURL={placeholderBlur}
				priority={priority}
				quality={100}
				loading={loading}
				sizes={sizes}
				src={src}
				width={!fill ? width : undefined}
			/>
		</picture>
	);
};
