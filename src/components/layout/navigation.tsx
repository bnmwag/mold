"use client";

import cn from "clsx";
import { useRef, type FC } from "react";
import { Link } from "../link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTransitionNavigation } from "@/lib/transitions";
import { usePathname } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
	{ name: "Home", href: "/" },
	{ name: "Work", href: "/work" },
	{ name: "About", href: "/about" },
	{ name: "Services", href: "/services" },
	{ name: "Journal", href: "/journal" },
];

export const Navigation: FC = () => {
	const logoRef = useRef<HTMLAnchorElement>(null!);
	const timelineRef = useRef<gsap.core.Timeline | null>(null);
	const router = useTransitionNavigation();
	const pathname = usePathname();

	useGSAP(
		() => {
			const logoSpan = logoRef.current.querySelector("span[data-logo]")!;
			const sloganSpan = logoRef.current.querySelector("span[data-slogan]")!;
			const firstSection = document.querySelector("main section")!;

			const tl = gsap.timeline({ paused: true });

			tl.to(logoSpan, { y: "0%", duration: 1, ease: "expo.inOut" }).to(
				sloganSpan,
				{ y: "-100%", duration: 1, ease: "expo.inOut" },
				"<",
			);

			timelineRef.current = tl;

			ScrollTrigger.create({
				trigger: firstSection,
				start: "bottom-=30px top",
				onEnter: () => tl.play(),
				onLeaveBack: () => tl.reverse(),
			});

			// Hover interaction
			const handleMouseEnter = () => {
				tl.play();
			};

			const handleMouseLeave = () => {
				tl.reverse();
			};

			logoRef.current.addEventListener("mouseenter", handleMouseEnter);
			logoRef.current.addEventListener("mouseleave", handleMouseLeave);

			return () => {
				logoRef.current.removeEventListener("mouseenter", handleMouseEnter);
				logoRef.current.removeEventListener("mouseleave", handleMouseLeave);
			};
		},
		{ scope: logoRef },
	);

	return (
		<header className="fixed inset-x-0 top-0 z-10 mix-blend-difference [view-transition-name:nav]">
			<div className="dr-layout-grid py-safe">
				<Link
					href="/"
					onClick={(e) => {
						e.preventDefault();
						router.push("/", { scrollTop: true });
					}}
					ref={logoRef}
					className="relative col-span-4 overflow-hidden cursor-pointer"
				>
					<span data-slogan className="inline-block">
						For designers, developers, and digital makers
					</span>
					<span data-logo className="absolute top-0 left-0 translate-y-full bg-contrast px-1 text-primary">
						MOLD&trade;
					</span>
				</Link>
				<nav className="col-span-6 col-start-7 flex justify-between">
					<ul className="flex items-center gap-x-[calc(var(--gap)/2)]">
						{navItems.map((item) => (
							<li key={item.name} className="text-sm">
								<Link
									href={item.href}
									variant="inline"
									isActive={item.href === pathname}
									onClick={(e) => {
										e.preventDefault();
										router.push(item.href, { scrollTop: true });
									}}
								>
									{item.name}
								</Link>
							</li>
						))}
					</ul>
					<Link href={"/contact"} className="text-sm">
						Get Started
					</Link>
				</nav>
			</div>
		</header>
	);
};
