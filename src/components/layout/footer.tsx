"use client";

import { useRef, type FC } from "react";
import { Link } from "@/components/link";

export const Footer: FC = () => {
	return null;

	const footerRef = useRef<HTMLDivElement>(null);
	const logoRef = useRef<HTMLDivElement>(null);

	return (
		<footer ref={footerRef} className="relative border-secondary border-t">
			<div className="h-[18vw] overflow-hidden">
				<div ref={logoRef} className="text-[26.4vw] uppercase leading-[1]">
					Mold&trade;
				</div>
			</div>
		</footer>
	);
};
