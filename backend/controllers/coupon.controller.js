import Coupon from "../models/coupon.model.js";

export const getCoupon = async (req, res) => {
	try {
		const coupon = await Coupon.findOne({ userId: req.user._id, isActive: true });
		res.json(coupon || null);
	} catch (error) {
		console.log("Error in getCoupon controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

// Validate coupon code for the logged-in user , expired or inactive coupons should not be valid
export const validateCoupon = async (req, res) => {
	try {
		const { code } = req.body;
        // find one coupon by code and userId and isActive true
		const coupon = await Coupon.findOne({ code: code, userId: req.user._id, isActive: true });

		if (!coupon) {
			return res.status(404).json({ message: "Coupon not found" });
		}
         // check if coupon is expired
		if (coupon.expirationDate < new Date()) {
			coupon.isActive = false;
			await coupon.save(); // deactivate expired coupon
			return res.status(404).json({ message: "Coupon expired" });
		}

        // if all good, return coupon details
		res.json({
			message: "Coupon is valid",
			code: coupon.code,
			discountPercentage: coupon.discountPercentage,
		});
	} catch (error) {
		console.log("Error in validateCoupon controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};
