import dotenv from 'dotenv';
dotenv.config();

import ConnectDB from './connections/db.js';
import express from 'express';
import cookieParser from 'cookie-parser';




//routes
import authRoutes from './routes/auth.route.js';
import productsRoutes from './routes/product.route.js';
import cartRoutes from './routes/cart.route.js';
import couponRoutes from './routes/coupon.route.js';
import paymentRoutes from './routes/payment.route.js';
import analyticsRoutes from './routes/analytics.route.js';


const app = express();
app.use(express.json());
app.use(cookieParser()); // to parse cookies from incoming requests


const PORT = process.env.PORT || 5001;

app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);




app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
  ConnectDB();
});