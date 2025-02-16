export const checkAuth = (req, res, next) => {
	const token = req.cookies
	console.log('checkAuth', token);

	next()
}