import { anyone } from "./anyone";
import { authenticated } from "./authenticated";
import { authenticatedOrPublished } from "./authenticatedOrPublished";

export const access = {
	authenticated,
	authenticatedOrPublished,
	anyone,
};
