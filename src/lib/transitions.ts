import { useGSAP, type ContextFunc, type useGSAPConfig, type useGSAPReturn } from "@gsap/react";
import { useLenis } from "lenis/react";
import { useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { create } from "zustand";

/**
 * Zustand store for tracking whether a page transition is currently in progress.
 */
export const useTransitionState = create<{
	isTransitioning: boolean;
	startTransition: () => void;
	endTransition: () => void;
}>((set) => ({
	isTransitioning: true,
	startTransition: () => set({ isTransitioning: true }),
	endTransition: () => set({ isTransitioning: false }),
}));

/**
 * Runs a GSAP animation only when no page transition is currently in progress.
 *
 * @param func - GSAP animation function or config
 * @param configOrDeps - Scope config or dependency array
 * @param debug - If true, logs when animation is skipped due to active transition
 * @returns The GSAP context return value
 */
export const useEntryAnimation = (
	func?: ContextFunc | useGSAPConfig,
	configOrDeps?: unknown[] | useGSAPConfig,
	debug = process.env.NODE_ENV === "development",
): useGSAPReturn => {
	const { isTransitioning, endTransition } = useTransitionState();

	let finalConfig: useGSAPConfig;

	if (Array.isArray(configOrDeps)) {
		finalConfig = { dependencies: [...configOrDeps, isTransitioning] };
	} else {
		finalConfig = {
			...configOrDeps,
			dependencies: [...(configOrDeps?.dependencies ?? []), isTransitioning],
		};
	}

	return useGSAP((ctx) => {
		if (isTransitioning || !func) {
			if (debug) console.log("[useEntryAnimation] Skipping animation, transition in progress.");
			return;
		}
		if (typeof func === "function") {
			if (debug) console.log("[useEntryAnimation] Running animation.");
			func(ctx);
		}
	}, finalConfig);
};

interface NavigateOptions {
	/** Whether to scroll to the top after navigation (default: true) */
	scrollTop?: boolean;
	/** Whether to use view transition animation (default: true) */
	withTransition?: boolean;
}

/**
 * Custom router wrapper for animated page transitions.
 * Triggers `::view-transition-*` animation and tracks transition state.
 *
 * @returns A `push` method that navigates to a new route with animation handling.
 */
export const useTransitionNavigation = () => {
	const router = useTransitionRouter();
	const pathname = usePathname();
	const lenis = useLenis();
	const { startTransition, endTransition } = useTransitionState();

	const push = async (url: string, options: NavigateOptions = {}) => {
		if (pathname === url) return;

		const { scrollTop, withTransition = true } = options;

		if (scrollTop ?? true) {
			lenis?.scrollTo(0, { duration: 0.5 });
		}

		if (withTransition) {
			startTransition();
		}

		router.push(url, {
			onTransitionReady: () => {
				if (withTransition) {
					document.documentElement.animate(
						[
							{ clipPath: "polygon(25% 75%, 75% 75%, 75% 75%, 25% 75%)" },
							{ clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)" },
						],
						{
							duration: 2000,
							easing: "cubic-bezier(1, 0, 0, 1)",
							pseudoElement: "::view-transition-new(root)",
						},
					);

					// // Delay endTransition slightly to allow entry animations to overlap with view transition
					// setTimeout(() => {
					// 	endTransition();
					// }, 250);
				} else {
					endTransition();
				}
			},
		});
	};

	return { push };
};
