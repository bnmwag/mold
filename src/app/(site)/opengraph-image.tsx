import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import AppData from "@/../package.json";

export const alt = AppData.name;
export const size = {
	width: 1200,
	height: 630,
};

export const contentType = "image/png";

export default async function Image() {
	const SwitzerRegular = await readFile(join(process.cwd(), "public/fonts/switzer/Switzer-Regular.ttf"));

	return new ImageResponse(
		<div
			style={{
				height: "100%",
				width: "100%",
				display: "flex",
				flexDirection: "column",
				backgroundColor: "#0b0b0a",
				color: "#fff",
				alignItems: "center",
				justifyContent: "center",
				padding: "0px 48px 36px 48px",
				fontFamily: "Switzer",
				textTransform: "uppercase",
			}}
		>
			<div
				style={{
					height: "100%",
					width: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					fontSize: 14,
					fontWeight: 400,
				}}
			>
				<div
					style={{
						alignSelf: "flex-start",
						textAlign: "left",
						justifySelf: "flex-start",
						display: "flex",
						fontSize: 256,
						fontWeight: 400,
					}}
				>
					{AppData.name}&trade;
				</div>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "flex-end",
						fontSize: 24,
						fontWeight: 400,
					}}
				>
					<div style={{ display: "flex", flexDirection: "column" }}>
						For designers, developers,
						<br /> and digital makers
					</div>
					<div>mold.bnm.st</div>
				</div>
			</div>
		</div>,
		// ImageResponse options
		{
			...size,
			fonts: [
				{
					name: "Switzer",
					data: SwitzerRegular,
					style: "normal",
					weight: 400,
				},
			],
		},
	);
}
