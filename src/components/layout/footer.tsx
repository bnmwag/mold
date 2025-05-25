import type { FC } from "react";
import { Link } from "@/components/link";

export const Footer: FC = () => {
	return (
		<footer className="flex flex-col dt:flex-row items-center dt:items-start justify-between p-safe uppercase">
			<Link href="https://darkroom.engineering/" className="link">
				Mold&trade;
			</Link>
			<div>
				<Link
					href="https://github.com/darkroomengineering/satus/generate"
					className="link"
				>
					use this template
				</Link>
				{" / "}
				<Link
					href="https://github.com/darkroomengineering/satus"
					className="link"
				>
					github
				</Link>
			</div>
		</footer>
	);
};
