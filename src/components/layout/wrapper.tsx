"use client";

import cn from "clsx";
import type { LenisOptions } from "lenis";
// import { type ComponentProps } from "react";

// import type { Theme } from '~/styles/config'
// import { Canvas } from '~/webgl/components/canvas'
import { Lenis } from "./lenis";
import { Footer } from "./footer";
import { Navigation } from "./navigation";

interface WrapperProps extends React.HTMLAttributes<HTMLDivElement> {
	lenis?: boolean | LenisOptions;
	// webgl?: boolean | Omit<ComponentProps<typeof Canvas>, "children">;
}

export function Wrapper({
	children,
	className,
	lenis = true,
	// webgl,
	...props
}: WrapperProps) {
	return (
		<>
			{/* {webgl && <Canvas root {...(typeof webgl === 'object' && webgl)} />} */}
			<Navigation />
			<main className={cn("relative flex grow flex-col", className)} {...props}>
				{children}
				{/* <script>
					{`document.documentElement.setAttribute('data-theme', '${theme}');`}
				</script> */}
			</main>
			<Footer />
			{lenis && <Lenis root options={typeof lenis === "object" ? lenis : {}} />}
		</>
	);
}
