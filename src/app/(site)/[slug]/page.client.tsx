"use client";

import { RefreshRouteOnSave as PayloadLivePreview } from "@payloadcms/live-preview-react";
import { useRevealer } from "@/hooks/use-revealer";
import type { FC } from "react";
import { useRouter } from "next/navigation";

export const PageClient: FC = () => {
	const router = useRouter();
	useRevealer();

	return (
		<>
			<PayloadLivePreview refresh={() => router.refresh()} serverURL={process.env.NEXT_PUBLIC_BASE_URL || ""} />
			<div className="revealer | pointer-events-none fixed inset-0 z-10 flex origin-top items-center justify-center bg-contrast" />
		</>
	);
};
