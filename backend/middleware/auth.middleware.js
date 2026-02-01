import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// middleware to protect routes
// only allow authenticated users

export const protectRoute = async (req, res, next) => {
	try {
		const accessToken = req.cookies.accessToken;

		if (!accessToken) {
			return res.status(401).json({ message: "Unauthorized - No access token provided" });
		}

		try {
            // when we generate the token we store userId in it and now we are extracting it
			const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            
            // fetching the user from the database using the userId from the token and excluding the password field
			const user = await User.findById(decoded.userId).select("-password");

			if (!user) {
				return res.status(401).json({ message: "User not found" });
			}
            // attaching the user to the req object for further use in the route handlers
			req.user = user;

			next();
		} catch (error) {
			if (error.name === "TokenExpiredError") {
				return res.status(401).json({ message: "Unauthorized - Access token expired" });
			}
			throw error;
		}

        // Handling the cookie not present case
	} catch (error) {
		console.log("Error in protectRoute middleware", error.message);
		return res.status(401).json({ message: "Unauthorized - Invalid access token" });
	}
};

// middleware to allow only admin users
export const adminRoute = (req, res, next) => {
	if (req.user && req.user.role === "admin") {
		next();
	} else {
		return res.status(403).json({ message: "Access denied - Admin only" });
	}
};
