export const INCREMENT = 'counter/INCREMENT';
export function increment () {
	return {
		type: INCREMENT
	};
}

export const CLEAR = 'counter/CLEAR';
export function clear () {
	return {
		type: CLEAR
	};
}