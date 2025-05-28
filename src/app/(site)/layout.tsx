import "@/css/index.css";

import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { PropsWithChildren } from "react";
import { ReactTempus } from "tempus/react";
import AppData from "@/../package.json";

import { RealViewport } from "@/components/layout/real-viewport";
import { GSAP } from "@/components/gsap/gsap";

const APP_NAME = AppData.name;
const APP_DEFAULT_TITLE = "Mold";
const APP_TITLE_TEMPLATE = "%s - Mold";
const APP_DESCRIPTION = AppData.description;
const APP_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const metadata: Metadata = {
	metadataBase: new URL(`${APP_BASE_URL}`),
	applicationName: APP_NAME,
	title: {
		default: APP_DEFAULT_TITLE,
		template: APP_TITLE_TEMPLATE,
	},
	description: APP_DESCRIPTION,
	alternates: {
		canonical: "/",
		languages: {
			"en-US": "/en-US",
		},
	},
	appleWebApp: {
		capable: true,
		statusBarStyle: "default",
		title: APP_DEFAULT_TITLE,
	},
	formatDetection: {
		telephone: false,
	},
	openGraph: {
		type: "website",
		siteName: APP_NAME,
		title: {
			default: APP_DEFAULT_TITLE,
			template: APP_TITLE_TEMPLATE,
		},
		description: APP_DESCRIPTION,
		url: APP_BASE_URL,
		images: [
			{
				url: "/og-image.png",
				width: 1200,
				height: 630,
				alt: APP_DEFAULT_TITLE,
			},
		],
		locale: "en_US",
	},
	twitter: {
		card: "summary_large_image",
		title: {
			default: APP_DEFAULT_TITLE,
			template: APP_TITLE_TEMPLATE,
		},
		description: APP_DESCRIPTION,
	},
	authors: [{ name: "darkroom.engineering", url: "https://darkroom.engineering" }],
	other: {
		"fb:app_id": process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || "",
	},
};

export const viewport: Viewport = {
	themeColor: "#f00",
	colorScheme: "normal",
};

const sans = localFont({
	src: [
		{
			path: "../../../public/fonts/switzer/Switzer-Variable.woff2",
			style: "normal",
		},
	],
	display: "swap",
	variable: "--font-sans",
	preload: true,
});

export default function Layout({ children }: PropsWithChildren) {
	return (
		<html lang="en" dir="ltr" className={`${sans.variable}`} suppressHydrationWarning>
			<body>
				<RealViewport />
				{children}
				<GSAP />
				<ReactTempus patch />
			</body>
		</html>
	);
}
