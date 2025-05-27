export const lerp = (a: number, b: number, t: number) => {
	return a + (b - a) * t;
};

export const randId = () => Math.random().toString(36).substring(2, 9);
