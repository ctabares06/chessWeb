export const toAsync = (cb: Function) =>
	new Promise((resolve, reject) => {
		try {
			resolve(cb());
		} catch (error) {
			reject(error);
		}
	});
