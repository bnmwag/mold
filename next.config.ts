import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
	? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
	: process.env.__NEXT_PRIVATE_ORIGIN || "http://localhost:3000";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => new URL(item))],
	},
};

export default withPayload(nextConfig);
