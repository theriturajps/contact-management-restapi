import jwt from "jsonwebtoken";

export const checkAuthToken = (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader?.split(' ')[1]; // Optional chaining to avoid errors

	if (!token) {
		return res.status(401).json({
			success: false,
			message: 'Unauthorized: No Bearer token provided', // Provide Access Token in Authorization
		});
	}

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
		if (err) {
			return res.status(403).json({
				success: false,
				message: 'Forbidden: Invalid or expired token',
			});
		}

		req.userData = decoded; // Attach decoded token data to request
		next(); // Proceed to next middleware or route handler
	});
};
