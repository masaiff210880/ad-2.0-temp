const express = require("express");
const router = express.Router();
const authentication = require("../middleware/authentication.js");
const authorization = require("../middleware/authorization");
// internal
const productController = require("../controller/product.controller");

const redis = require("redis");
const client = redis.createClient();

client.on("error", (err) => {
  console.error(err);
});
// client.on('connect', () => {
//   console.log('Connected to Redis');
// });

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The name of the product.
 *         productCode:
 *           type: string
 *           description: The product code.
 *         shortDescription:
 *           type: string
 *           description: The base description of the product.
 *         description:
 *           type: string
 *           description: The detailed description of the product.
 *         sku:
 *           type: string
 *           description: The SKU (Stock Keeping Unit) of the product.
 *         featuredImage:
 *           type: string
 *           description: The URL of the featured image for the product.
 *         galleryImage:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of URLs for the product gallery images.
 *         category:
 *           type: string
 *           description: The category of the product.
 *         brand:
 *           type: string
 *           description: The brand of the product.
 *         subBrand:
 *           type: string
 *           description: The sub-brand of the product.
 *         percentTax:
 *           type: number
 *           description: The tax percentage applicable to the product.
 *         mlBasedTax:
 *           type: number
 *           description: The tax amount based on milliliters (ml) of the product.
 *         stateTax:
 *           type: number
 *           description: The state tax applicable to the product.
 *         costTax:
 *           type: number
 *           description: The tax calculated based on the cost of the product.
 *         totalTax:
 *           type: number
 *           description: The total tax amount for the product.
 *         displaySilverPrice:
 *           type: number
 *           description: The displayed price for silver customers.
 *         displayGoldPrice:
 *           type: number
 *           description: The displayed price for gold customers.
 *         displayPlatinumPrice:
 *           type: number
 *           description: The displayed price for platinum customers.
 *         quantity:
 *           type: number
 *           description: The available quantity of the product.
 *         variants:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Variant'
 *           description: An array of product variants.
 *         status:
 *           type: string
 *           enum:
 *             - in-stock
 *             - out-of-stock
 *             - discontinued
 *           description: The status of the product.
 *         disable:
 *           type: boolean
 *           description: A flag to indicate whether the product is disabled or not.
 *         discount:
 *           type: number
 *           description: The discount amount applicable to the product.
 *       required:
 *         - title
 *         - shortDescription
 *         - featuredImage
 *         - category
 *         - brand
 */

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: APIs related to products
 */

/**
 * @swagger
 * /api/product/all:
 *   get:
 *     summary: Get all products
 *     description: Retrieve all products with optional pagination and filtering
 *     tags: [Product]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination (default: 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of products per page (default: 10)
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   default: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 isUserLogin:
 *                   type: boolean
 *                 userType:
 *                   type: string
 *                 page:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 */
// get all products
router.get("/all", productController.getAllProductsForUSer);

router.get("/empty", productController.emptyTheCategory);

/**
 * @swagger
 * /api/product/one/{id}:
 *   get:
 *     summary: Get a particular product with all variants
 *     description: Retrieve a particular product with all its variants
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product to retrieve
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   default: true
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *                 isUserLogin:
 *                   type: boolean
 *                 userType:
 *                   type: string
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   default: false
 *                 message:
 *                   type: string
 */
//get one particular product with all variants
router.get("/one/:id", productController.getOneProduct);

// router.use(authentication);

// get all products for admin
router.get(
  "/admin",
  // authorization("admin", "superadmin", "masteradmin"),
  productController.getAllProductsForAdmin
);

// Define the route for searching products by letter in name, sku and slug fileds
router.get("/multisearch/:input", productController.globalSearchProducts);

/**
 * @swagger
 * /api/product/add:
 *   post:
 *     summary: Add a new product
 *     description: Add a new product with the provided details
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   default: true
 *                 message:
 *                   type: string
 *                   description: Success message
 */
//add product
router.post("/add", productController.addProduct);

// add a product variant 1/more than 1 items

// /**
//  * @swagger
//  * /api/product/add-all:
//  *   post:
//  *     summary: Add multiple products
//  *     description: Add multiple products with the provided details
//  *     tags: [Product]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: array
//  *             items:
//  *               $ref: '#/components/schemas/Product'
//  *     responses:
//  *       200:
//  *         description: Products added successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   description: Success message
//  */
// add all product
router.post("/add-all", productController.addAllProducts);

/**
 * @swagger
 * /api/product/update/{id}:
 *   patch:
 *     summary: Update a particular product
 *     description: Update a particular product with the specified ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product to update
 *       - in: body
 *         name: product
 *         description: Updated product object
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product Updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   default: true
 *                 message:
 *                   type: string
 *                 product:
 *                   $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   default: false
 *                 message:
 *                   type: string
 */
// update one product
router.patch("/update/:productId", productController.updateProduct);

router.patch("/update-all", productController.updateAll);

router.patch("/relationship", productController.relationShip);

//getProductsByCategoryId
router.get(
  "/categoryby/:categoryId",
  productController.getProductsByCategoryId
);

//getVendorDataForOneProduct
router.get("/vendor-product/:productId", productController.getVendorDataForOneProduct);

/**
 * @swagger
 * /api/product/delete/{id}:
 *   delete:
 *     summary: Delete a particular product
 *     description: Delete a particular product with the specified ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product to delete
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   default: true
 *                 message:
 *                   type: string
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   default: false
 *                 message:
 *                   type: string
 */
// delete one product with all variants
router.delete("/delete/:id", productController.deleteProduct);

/**
 * @swagger
 * /api/product/delete-one-gallery/{productId}:
 *   delete:
 *     summary: Delete a single gallery image
 *     description: Delete a single gallery image from a product
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product that contains the gallery image
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               imageUrl:
 *                 type: string
 *                 description: URL of the gallery image to be deleted
 *     responses:
 *       200:
 *         description: Image deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   default: true
 *                 message:
 *                   type: string
 *       404:
 *         description: Product or image not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   default: false
 *                 message:
 *                   type: string
 */
//delete one gallery image
router.delete(
  "/delete-one-gallery/:productId",
  productController.deleteOneGalleryImage
);

/**
 * @swagger
 * /api/product/delete-gallery/{productId}:
 *   delete:
 *     summary: Delete all gallery images
 *     description: Delete all gallery images from a product
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product that contains the gallery images
 *     responses:
 *       200:
 *         description: All images deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   default: true
 *                 message:
 *                   type: string
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   default: false
 *                 message:
 *                   type: string
 */
//delete all gallery image
router.delete(
  "/delete-gallery/:productId",
  productController.deleteAllGalleryImage
);

//delete multiple products
router.delete("/delete-multiple", productController.deleteMultipleProducts);

// get all disabled Products
router.get("/disabled", productController.getAllDisableProducts);

// get all trashed Products
router.get("/trashed", productController.getAllTrashProducts);

// ==============================================================================================
// get Single Product
router.get("/single-product/:id", productController.getSingleProduct);

// Define the route for searching products by letter in name fields only
router.get("/search/:letter", productController.searchProductsByLetter);

/**
 * @swagger
 * /api/product/list/{type}:
 *   get:
 *     summary: Get list of product categories
 *     description: Get list of product categories by type
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: type
 *         schema:
 *           type: string
 *         required: true
 *         description: Type of product category (e.g., "category", "brand", "subBrand")
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
//get all category of product
router.get("/list/:type", productController.allProductlist);

// top rated products
router.get("/top-rated", productController.getTopRatedProducts);

// get popular products by type
router.get("/popular/:type", productController.getPopularProductByType);

router.get("/top-selling", productController.topSellingProduct);

// get Products ByType
router.get("/:type", productController.getProductsByType);

// get Related Products
router.get("/related-product/:id", productController.getRelatedProducts);

// get offer timer product
router.get("/offer", productController.getOfferTimerProducts);

/**
 * @swagger
 * /api/product/allproducts:
 *   get:
 *     summary: Get all products without any filter
 *     description: Retrieve all products without any filtering or pagination
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   default: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 totalProducts:
 *                   type: integer
 */
//get all products without any filter
router.get("/allproducts", productController.getAllProductsWithoutFilter);

/**
 * @swagger
 * /api/product/get-one/{id}:
 *   get:
 *     summary: Get a single product by ID
 *     description: Get a single product by its ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product to retrieve
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   default: true
 *                 products:
 *                   $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   default: false
 *                 message:
 *                   type: string
 */
//get one product by id
router.get("/get-one/:id", productController.getOneProductById);

router.patch("/add-fields", productController.addFieldsToEachProduct);

module.exports = router;
