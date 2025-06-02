import { useLenis } from "lenis/react";
import { useEffect, useState } from "react";

type CursorPosition = {
	x: number;
	y: number;
};

export function useCursor() {
	const lenis = useLenis();

	const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });

	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			const scroll = lenis?.scroll || 0;
			const x = event.clientX;
			const y = event.clientY + scroll;
			setPosition({ x, y });
		};

		window.addEventListener("mousemove", handleMouseMove, { passive: true });

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, [lenis]);

	return { position };
}
