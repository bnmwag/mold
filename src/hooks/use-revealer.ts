import { useTransitionState } from "@/lib/transitions";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const useRevealer = () => {
	const { endTransition, isTransitioning } = useTransitionState();

	useGSAP(
		() => {
			if (!isTransitioning) return;

			const tl = gsap.timeline();

			tl.to(".revealer", {
				scaleY: 0,
				duration: 1.25,
				delay: 1,
				ease: "expo.inOut",
			});

			tl.call(() => endTransition(), undefined, "<33.33%");
		},
		{ dependencies: [isTransitioning] },
	);
};
