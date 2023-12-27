export const parseYupError = (yupError) => {
	const { inner } = yupError;
	return Array.isArray(inner)
		? inner.reduce((acc, item) => {
				const { path, errors } = item;
				return {
					...acc,
					[path]: errors[0],
				};
		  }, {})
		: {};
};
