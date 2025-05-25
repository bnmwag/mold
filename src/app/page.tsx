import { Wrapper } from "@/components/layout/wrapper";
import type { NextPage } from "next";

const IndexPage: NextPage = () => {
	return (
		<Wrapper>
			<div className="grid grid-cols-12">
				<h1 className="col-span-8 col-start-5 indent-[25%] text-[5vw] leading-none uppercase">
					Crafting Timeless Websites With Grace And Precision
				</h1>
			</div>
		</Wrapper>
	);
};

export default IndexPage;
