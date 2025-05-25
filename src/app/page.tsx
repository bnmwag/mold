import { Wrapper } from "@/components/layout/wrapper";
import { Split } from "@/components/motion/split";
import type { NextPage } from "next";

const IndexPage: NextPage = () => {
	return (
		<Wrapper>
			<section className="relative h-[80svh] bg-primary pt-[calc(var(--gap)*2)]">
				<div className="dr-layout-grid h-full py-gap">
					<Split type="lines" delay={0.2}>
						<h1 className="col-span-8 col-start-5 indent-[25%] uppercase">Elevating Digital Experiences With Precision & Soul</h1>
					</Split>
					<Split type="lines" delay={0.8}>
						<p className="col-span-4 col-start-1 text-balance uppercase content-end-safe">
							Build using Next.js, Payload CMS, Tailwind CSS, GSAP, and TypeScript.
						</p>
					</Split>
				</div>
			</section>
			{/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
			<section className="h-svh bg-white"></section>
		</Wrapper>
	);
};

export default IndexPage;
