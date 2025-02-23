// Custom rate limiter using in-memory storage
class RateLimiter {
	constructor() {
		this.requests = new Map();

		// Clean up expired entries every 5 minutes
		setInterval(() => {
			const now = Date.now();
			for (const [key, value] of this.requests.entries()) {
				if (now > value.resetTime) {
					this.requests.delete(key);
				}
			}
		}, 5 * 60 * 1000);
	}

	// Get client IP from request
	getClientIdentifier(req) {
		return req.ip ||
			req.connection.remoteAddress ||
			req.headers['x-forwarded-for'];
	}
}

/**
 * Creates a rate limiter middleware
 * @param {Object} options Rate limiter options
 * @param {number} options.windowMs Time window in milliseconds
 * @param {number} options.maxRequests Maximum requests allowed in the time window
 * @param {string} options.message Custom error message
 * @returns {Function} Express middleware function
 */

export const createRateLimiter = (options = {}) => {
	const {
		windowMs = 60 * 1000, // default: 1 minute
		maxRequests = 100,    // default: 100 requests per window
		message = 'Too many requests, Please try again later.'
	} = options;

	const limiter = new RateLimiter();

	return (req, res, next) => {
		const clientId = limiter.getClientIdentifier(req);
		const now = Date.now();

		// Get or create client's request record
		let clientRequests = limiter.requests.get(clientId);

		if (!clientRequests) {
			clientRequests = {
				count: 0,
				resetTime: now + windowMs
			};
			limiter.requests.set(clientId, clientRequests);
		}

		// Reset count if time window has passed
		if (now > clientRequests.resetTime) {
			clientRequests.count = 0;
			clientRequests.resetTime = now + windowMs;
		}

		// Increment request count
		clientRequests.count++;

		// Set rate limit headers
		res.setHeader('X-RateLimit-Limit', maxRequests);
		res.setHeader('X-RateLimit-Remaining', Math.max(0, maxRequests - clientRequests.count));
		res.setHeader('X-RateLimit-Reset', Math.ceil(clientRequests.resetTime / 1000));

		// Check if rate limit is exceeded
		if (clientRequests.count > maxRequests) {
			return res.status(429).json({
				error: 'Too many requests, Please try again later.',
				message: message,
				retryAfter: Math.ceil((clientRequests.resetTime - now) / 1000)
			});
		}

		next();
	};
};
