export const toAsync = (cb: () => void) =>
	new Promise((resolve, reject) => {
		try {
			resolve(cb());
		} catch (error) {
			reject(error);
		}
	});
