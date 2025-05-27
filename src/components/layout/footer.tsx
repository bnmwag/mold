"use client";

import { useRef, type FC } from "react";
import { Link } from "@/components/link";
import { ProgressiveBlur } from "../progressive-blur";
import { Split } from "../motion/split";

export const Footer: FC = () => {
	const footerRef = useRef<HTMLDivElement>(null);

	return (
		<footer ref={footerRef} className="relative">
			<div className="dr-layout-grid mb-[5vw]">
				<div className="!space-y-12 col-span-4">
					<Split type="lines" animationOnScroll>
						<p className="h4 | text-balance">
							Ready to build something bold? Mold gives you a motion-first foundation for fast, elegant websites — no setup
							stress, just flow.
						</p>
					</Split>
					<Link href="/" variant="bulky" className="flex w-full">
						View on Github
					</Link>
				</div>
				<nav className="col-span-3 col-start-7">
					<Split type="lines" animationOnScroll>
						<ul className="!space-y-gap">
							<li>
								<Link href="https://github.com/yourusername/mold" variant="inline">
									View on GitHub
								</Link>
							</li>
							<li>
								<Link href="/docs" variant="inline">
									Documentation
								</Link>
							</li>
							<li>
								<Link href="/examples" variant="inline">
									Showcases
								</Link>
							</li>
						</ul>
					</Split>
				</nav>
				<div className="col-span-3 col-start-10">
					<Split type="lines" animationOnScroll>
						<p className="h5 | text-balance">
							Mold isn’t just a template — it’s a starting point for expressive, high-impact websites. Make it yours.
						</p>
					</Split>
				</div>
			</div>
			<div className="relative h-[18vw] overflow-hidden">
				<ProgressiveBlur className="pointer-events-none absolute bottom-0 left-0 h-2/3 w-full" blurIntensity={6} />
				<div className="text-[26.4vw] text-secondary/50 uppercase leading-[1]">Mold&trade;</div>
			</div>
		</footer>
	);
};
