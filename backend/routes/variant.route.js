const express = require("express");
const router = express.Router();
// internal
const variantController = require("../controller/variant.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     Variant:
 *       type: object
 *       properties:
 *         productId:
 *           type: string
 *           description: The ID of the product associated with the variant.
 *         variantTitle:
 *           type: string
 *           description: The title of the product variant.
 *         itemCode:
 *           type: string
 *           description: The item code for the variant.
 *         variantImage:
 *           type: string
 *           description: The URL of the variant image.
 *         variantType:
 *           type: string
 *           description: The type of the variant.
 *         flavour:
 *           type: string
 *           description: The flavour of the variant.
 *         sku:
 *           type: string
 *           description: The SKU (Stock Keeping Unit) of the variant.
 *         barcode:
 *           type: string
 *           description: The barcode of the variant.
 *         costPrice:
 *           type: number
 *           description: The cost price of the product variant.
 *         silverSellingPrice:
 *           type: number
 *           description: The selling price of the variant for Silver users.
 *         goldSellingPrice:
 *           type: number
 *           description: The selling price of the variant for Gold users.
 *         platinumSellingPrice:
 *           type: number
 *           description: The selling price of the variant for Platinum users.
 *         silverSellingPercent:
 *           type: number
 *           description: The selling percentage of the variant for Silver users.
 *         goldSellingPercent:
 *           type: number
 *           description: The selling percentage of the variant for Gold users.
 *         platinumSellingPercent:
 *           type: number
 *           description: The selling percentage of the variant for Platinum users.
 *         status:
 *           type: string
 *           enum: [in-stock, out-of-stock, discontinued]
 *           description: The status of the variant (in-stock, out-of-stock, discontinued).
 *         disable:
 *           type: boolean
 *           description: A flag indicating if the variant is disabled.
 *         quantity:
 *           type: number
 *           description: The quantity of the variant in stock.
 *       required:
 *         - productId
 *         - variantTitle
 *         - barcode
 *         - costPrice
 *         - quantity
 */

/**
 * @swagger
 * tags:
 *   name: Variants
 *   description: APIs related to Variants
 */

/**
 * @swagger
 * /api/variant/add/{productId}:
 *   post:
 *     summary: Add one or more variants to a product
 *     description: Add one or more variants to a product using its productId.
 *     tags: [Variants]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: The ID of the product to which the variants will be added.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               variants:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Variant'
 *     responses:
 *       200:
 *         description: Variants added to the product successfully
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
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Variant'
 *       400:
 *         description: Bad Request
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
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   default: false
 *                 error:
 *                   type: string
 */
// add 1 or more variant
router.post("/add/:productId", variantController.addVariants);

/**
 * @swagger
 * /api/variant/update:
 *   patch:
 *     summary: Update a product variant
 *     description: Update a product variant based on its variantId.
 *     tags: [Variants]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               variantId:
 *                 type: string
 *                 description: The ID of the variant to be updated.
 *               costPrice:
 *                 type: number
 *                 description: The new cost price of the variant.
 *               silverSellingPrice:
 *                 type: number
 *                 description: The new selling price for Silver users.
 *               goldSellingPrice:
 *                 type: number
 *                 description: The new selling price for Gold users.
 *               platinumSellingPrice:
 *                 type: number
 *                 description: The new selling price for Platinum users.
 *               silverSellingPercent:
 *                 type: number
 *                 description: The new selling percentage for Silver users.
 *               goldSellingPercent:
 *                 type: number
 *                 description: The new selling percentage for Gold users.
 *               platinumSellingPercent:
 *                 type: number
 *                 description: The new selling percentage for Platinum users.
 *               // ... Add other variant properties that can be updated
 *     responses:
 *       200:
 *         description: Product variant updated successfully
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
 *                   $ref: '#/components/schemas/Variant'
 *       400:
 *         description: Bad Request
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
 *       404:
 *         description: Product Variant not found
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
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   default: false
 *                 error:
 *                   type: string
 */
router.patch("/update", variantController.updateVariant);

//update all profit percent
router.patch("/update-all", variantController.updateAll);

/**
 * @swagger
 * /api/variant/delete/{id}:
 *   delete:
 *     summary: Delete a variant
 *     description: Delete a product variant by ID.
 *     tags: [Variants]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the variant to be deleted.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product Variant deleted successfully
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
 *         description: Product Variant not found
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
router.delete("/delete/:id", variantController.deleteVariantProduct);

/**
 * @swagger
 * /api/variant/all-variant:
 *   get:
 *     summary: Get all variants
 *     description: Get all product variants.
 *     tags: [Variants]
 *     responses:
 *       200:
 *         description: Success
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
 *                     $ref: '#/components/schemas/Variant'
 *       404:
 *         description: Variants not found
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

router.get("/all-variant", variantController.getAllVariants);

/**
 * @swagger
 * /api/variant/one-variant/{variantId}:
 *   get:
 *     summary: Get a single variant
 *     description: Get a single product variant by ID.
 *     tags: [Variants]
 *     parameters:
 *       - name: variantId
 *         in: path
 *         description: The ID of the variant to be retrieved.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   default: true
 *                 data:
 *                   $ref: '#/components/schemas/Variant'
 *       404:
 *         description: Variant not found
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
router.get("/one-variant/:variantId", variantController.getOneVariant);

module.exports = router;
