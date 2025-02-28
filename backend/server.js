import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
//import adminRoutes from "./routes/admin.route.js";
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import searchRoutes from "./routes/search.route.js";
import categoryRoutes from "./routes/category.route.js";
import favoriteRoutes from "./routes/favorite.route.js";
import saleRoutes from "./routes/sale.route.js";
import newRoutes from "./routes/new.route.js";
import brandRoutes from "./routes/brands.route.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Body Parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Cookie parser middleware
app.use(cookieParser());

//Connect to database
connectDB();

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/sale", saleRoutes);
app.use("/api/new", newRoutes);
app.use("/api/brands", brandRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server Is Running on Port ${PORT}`));
