const rateLimitStore = new Map();

/**
 * Advanced Rate Limiting Middleware
 * @param {Object} options - Configuration options
 * @param {number} options.windowMs - Time window in milliseconds (e.g., 60000 for 1 minute)
 * @param {number} options.maxRequests - Maximum number of requests allowed in the window
 * @param {Function} options.keyGenerator - Function to generate a unique key for rate limiting (default: IP-based)
 * @param {Function} options.handler - Function to handle rate limit exceeded responses
 * @param {Function} options.onLimitReached - Callback function when rate limit is reached
 * @param {boolean} options.trustProxy - Whether to trust proxy headers for IP (default: false)
 * @returns {Function} Express middleware
 */


const rateLimit = (options = {}) => {
	const {
		windowMs = 60 * 1000, // 1 minute
		maxRequests = 100, // 100 requests per window
		keyGenerator = (req) => (options.trustProxy ? req.ip : req.connection.remoteAddress), // Default: IP-based
		handler = (req, res) => res.status(429).json({ message: 'Too many requests, please try again later.' }),
		onLimitReached = (key) => console.log(`Rate limit reached for key: ${key}`),
		trustProxy = false, // Trust proxy headers for IP
	} = options;

	return (req, res, next) => {
		const key = keyGenerator(req);

		// Initialize the store for the key if it doesn't exist
		if (!rateLimitStore.has(key)) {
			rateLimitStore.set(key, {
				count: 0,
				windowStart: Date.now(),
			});
		}

		const currentTime = Date.now();
		const rateLimitData = rateLimitStore.get(key);

		// Reset the window if the time has expired
		if (currentTime - rateLimitData.windowStart > windowMs) {
			rateLimitData.count = 0;
			rateLimitData.windowStart = currentTime;
		}

		// Increment the request count
		rateLimitData.count += 1;

		// Check if the rate limit is exceeded
		if (rateLimitData.count > maxRequests) {
			onLimitReached(key);
			return handler(req, res);
		}

		// Set rate limit headers in the response
		res.setHeader('X-RateLimit-Limit', maxRequests);
		res.setHeader('X-RateLimit-Remaining', Math.max(0, maxRequests - rateLimitData.count));
		res.setHeader('X-RateLimit-Reset', Math.ceil((rateLimitData.windowStart + windowMs) / 1000));

		next();
	};
}

export { rateLimit };