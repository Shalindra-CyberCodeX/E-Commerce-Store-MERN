import express from "express";
import {
	createProduct,
	deleteProduct,
	getAllProducts,
	getFeaturedProducts,
	getProductsByCategory,
	getRecommendedProducts,
	toggleFeaturedProduct,
} from "../controllers/product.controller.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

//*          -------Admin routes-------

router.get("/", protectRoute, adminRoute, getAllProducts);

router.post("/", protectRoute, adminRoute, createProduct);

// Delete product route by passing product ID as a URL parameter
router.delete("/:id", protectRoute, adminRoute, deleteProduct);


// Toggle featured product status
//router.patch means update partially 
//router.put means update fully
router.patch("/:id", protectRoute, adminRoute, toggleFeaturedProduct);




//*    ------------Customer routes---------

router.get("/featured", getFeaturedProducts);

router.get("/recommendations", getRecommendedProducts);

// Get products by category when click on category link
router.get("/category/:category", getProductsByCategory);




export default router;
