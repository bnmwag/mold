"use client";

import NextLink from "next/link";
import { useCallback, type ComponentProps, type MouseEvent } from "react";
// import { usePageTransitionNavigate } from '../page-transition/context'

type LinkProps = Omit<ComponentProps<"a">, "href"> & {
	href?: string;
	prefetch?: boolean;
	variant?: "inline" | "bulky" | undefined;
	isActive?: boolean;
	onClick?: (e: MouseEvent<HTMLElement>) => void;
};

export function Link({
	href,
	onClick,
	isActive,
	prefetch = true,
	variant = undefined,
	className,
	children,
	...props
}: LinkProps) {
	// const navigate = usePageTransitionNavigate()
	const isExternal = href?.startsWith("http");

	// If no href is provided but there's an onClick, render a button
	if (!href && onClick) {
		return (
			<button onClick={(e: MouseEvent<HTMLButtonElement>) => onClick(e)} type="button" {...(props as ComponentProps<"button">)}>
				{children}
			</button>
		);
	}

	// If no href and no onClick, render a div
	if (!href) {
		return <div {...(props as ComponentProps<"div">)}>{children}</div>;
	}

	const linkProps = {
		...props,
		...(isExternal && { target: "_blank", rel: "noopener noreferrer" }),
	};

	const handleClick = useCallback(
		(e: MouseEvent<HTMLAnchorElement>) => {
			onClick?.(e);

			// if (!isExternal) {
			// e.preventDefault()
			// navigate(href)
			// }
		},
		[onClick],
	);

	return (
		<NextLink
			prefetch={prefetch}
			onClick={handleClick}
			href={href}
			className={`${typeof variant === "string" && variant} ${isActive ? "active" : ""} | ${className}`}
			{...linkProps}
		>
			{variant === "bulky" ? (
				<span className="relative flex w-full items-center justify-between">
					<span className="absolute bottom-0 inset-x-0 h-px  bg-secondary/15">
						<span className="bar | absolute inline-block h-full w-full bg-secondary" />
					</span>
					<span className="pt-3 pb-4">{children}</span>
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
						{/* Icon from Google Material Icons by Material Design Authors - https://github.com/material-icons/material-icons/blob/master/LICENSE */}
						<title>Arrow right</title>
						<path fill="currentColor" d="M6 6v2h8.59L5 17.59L6.41 19L16 9.41V18h2V6z" />
					</svg>
				</span>
			) : (
				children
			)}
		</NextLink>
	);
}
