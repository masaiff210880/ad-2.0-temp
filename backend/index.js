require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const helmet = require("helmet");

const fileRoute = require("./config/S3.wasabi");

// const { createClient } = require("redis")

// const client = createClient();

// client.on('error', err => console.log('Redis Client Error', err));

// client.connect();

const redis = require("redis");
const client = redis.createClient();

client.on("error", (err) => {
  console.error(err);
});

client.on("connect", () => {
  console.log("Connected to Redis");
});

// Add your routes and controllers for different models/pages here

//middlewares
const authentication = require("./middleware/authentication");

// routes
const wasteRoutes = require("./controller/Abcd.controller");

const userRoutes = require("./routes/user.routes");
const categoryRoutes = require("./routes/category.routes");
const subcategoryRoutes = require("./routes/subCategory.routes");
const subsubcategoryRoutes = require("./routes/subSubCategory.routes");
const brandRoutes = require("./routes/brand.routes");
const userOrderRoutes = require("./routes/user.order.routes");
const productRoutes = require("./routes/product.routes");
const cartRoutes = require("./routes/cart.routes");
const orderRoutes = require("./routes/order.routes");
const orderItemRoutes = require("./routes/orderItem.routes");
const couponRoutes = require("./routes/coupon.routes");
const reviewRoutes = require("./routes/review.routes");
const variantRoutes = require("./routes/variant.route");
const salesOrderRoutes = require("./routes/salesOrder.routes");
const orderFullfillRoutes = require("./routes/orderFullfill.route");
const vendorRoutes = require("./routes/vendor.routes");
const vendorStatisticsRoutes = require("./routes/vendorStatistics.route");
const purchaseItemRoutes = require("./routes/purchaseItem.route");
const PurchaseOrderRoutes = require("./routes/purchaseOrder.route");
const PurchaseReceiptRoutes = require("./routes/purchaseReceipt.route");
const disbursementRoutes = require("./routes/disbursement.route");
const ProductReturnRoutes = require("./routes/vendorRMAs.routes");
const orderReturnRoutes = require("./routes/userRMAs.routes");
const vendorContactRoutes = require("./routes/vendorContactPerson.routes");
const vendorActivityRoutes = require("./routes/vendorRecentActivity.routes");
const userActivityRoutes = require("./routes/userRecentActivity.routes");
const poCommentRoutes = require("./routes/poComment.routes");
const adminRoutes = require("./routes/admin.routes");
const adminRegisterRoutes = require("./routes/adminRegister.routes");
const draftRoutes = require("./routes/draft.routes");
const userPaymentRoutes = require("./routes/userPayment.routes");
const userLicenseRoutes = require("./routes/userLicense.routes");
const employeeRoutes = require("./routes/employee.routes");
const swaggerRoutes = require("./config/swaggerDocs");

// const uploadRouter = require('./routes/uploadFile.route');

connectDB();
// middleware
app.use(
  "*",
  cors({
    origin: true,
    credentials: true
  })
);

// app.use("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false
  })
);
app.use(cookieParser());

// connect database
app.use("/api", fileRoute);

app.use("/api/waste", wasteRoutes);

app.use("/", swaggerRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/admin-register", adminRegisterRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/subcategory", subcategoryRoutes);
app.use("/api/subsubcategory", subsubcategoryRoutes);
app.use("/api/license", userLicenseRoutes);

app.use(authentication); //for the admin purpose only hide authentication

app.use("/api/draft", draftRoutes);
app.use("/api/brand", brandRoutes);
app.use("/api/variant", variantRoutes);
app.use("/api/cart", cartRoutes);
// app.use('/api/upload',uploadRouter);
app.use("/api/order-item", orderItemRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/coupon", couponRoutes);
app.use("/api/user-order", userOrderRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/sales", salesOrderRoutes);
app.use("/api/fullfill", orderFullfillRoutes);
app.use("/api/vendor", vendorRoutes);
app.use("/api/vendor-activity", vendorActivityRoutes);
app.use("/api/user-activity", userActivityRoutes);
app.use("/api/contact", vendorContactRoutes);
app.use("/api/stat", vendorStatisticsRoutes);
app.use("/api/purchase-item", purchaseItemRoutes);
app.use("/api/po", PurchaseOrderRoutes);
app.use("/api/comment", poCommentRoutes);
app.use("/api/pr", PurchaseReceiptRoutes);
app.use("/api/return", ProductReturnRoutes);
app.use("/api/user-order-return", orderReturnRoutes);
app.use("/api/disbursh", disbursementRoutes);
app.use("/api/userpay", userPaymentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/employee", employeeRoutes);

// use express's default error handling middleware
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  res.status(400).json({ message: err.message });
});

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));

module.exports = app;
