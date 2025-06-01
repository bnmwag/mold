import type React from "react";
import type { Page } from "@/payload-types";
import { FeaturesBlock } from "@/blocks/features/features.block";
import { InteractiveVisualBreakBlock } from "@/blocks/interactive-visual-break/interactive-visual-break.block";
import { TextRevealBlock } from "@/blocks/text-reveal/text-reveal.block";
import { Fragment } from "react";

const blockComponents = {
	"interactive-visual-break": InteractiveVisualBreakBlock,
	"text-reveal": TextRevealBlock,
	features: FeaturesBlock,
};

export const RenderBlocks: React.FC<{
	blocks: Page["layout"][0][];
}> = (props) => {
	const { blocks } = props;

	const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

	if (hasBlocks) {
		return blocks.map((block, index) => {
			const { blockType } = block;

			if (blockType && blockType in blockComponents) {
				const Block = blockComponents[blockType];

				if (Block) {
					return (
						<Fragment key={index}>
							<Block {...block} />
						</Fragment>
					);
				}
			}
			return null;
		});
	}

	return null;
};
