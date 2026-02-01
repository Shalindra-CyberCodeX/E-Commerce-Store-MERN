    import express from "express";
    import { addToCart, getCartProducts, removeAllFromCart, updateQuantity } from "../controllers/cart.controller.js";
    import { protectRoute } from "../middleware/auth.middleware.js";

    const router = express.Router();

    router.get("/", protectRoute, getCartProducts); // get all products in cart for a user
    router.post("/", protectRoute, addToCart);
    // if we have one product that has quantity more than 1, we need remove all products from cart when delete button is clicked
    router.delete("/", protectRoute, removeAllFromCart);
    router.put("/:id", protectRoute, updateQuantity); // update quantity of a product in cart using + or - buttons

    export default router;
