const express = require("express");
const router = express.Router();
// internal
const purchaseItemController = require("../controller/purchaseItem.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     PurchaseItem:
 *       type: object
 *       properties:
 *         vendorId:
 *           type: string
 *           description: The ID of the vendor associated with the purchase item.
 *         productId:
 *           type: string
 *           description: The ID of the product associated with the purchase item.
 *         variantId:
 *           type: string
 *           description: The ID of the product variant associated with the purchase item.
 *         itemCode:
 *           type: string
 *           description: The item code for the purchase item.
 *         description:
 *           type: string
 *           description: The description of the purchase item.
 *         purchaseWeight:
 *           type: string
 *           description: The purchase weight of the item (if applicable).
 *         orderQuantity:
 *           type: number
 *           description: The ordered quantity of the purchase item.
 *         receivedQuantity:
 *           type: number
 *           description: The quantity of the purchase item that has been received.
 *         isReturn:
 *           type: boolean
 *           description: A flag indicating if the purchase item has been returned.
 *         returnQuantity:
 *           type: number
 *           description: The quantity of the purchase item that has been returned.
 *         pricePerUnit:
 *           type: number
 *           description: The price per unit of the purchase item.
 *         subTotal:
 *           type: number
 *           description: The subtotal for the purchase item (orderQuantity * pricePerUnit).
 *       required:
 *         - vendorId
 *         - productId
 *         - orderQuantity
 */

/**
 * @swagger
 * tags:
 *   name: Purchase Items
 *   description: APIs related to purchase items
 */

/**
 * @swagger
 * /api/purchase-item/receive-quantity:
 *   post:
 *     summary: Enter received quantity for a purchase item
 *     description: Enter the received quantity for a purchase item.
 *     tags: [Purchase Items]
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: purchaseItem
 *         required: true
 *         schema:
 *           $ref: "#/components/schemas/PurchaseItem"
 *     responses:
 *       200:
 *         description: Received quantity updated successfully
 *       404:
 *         description: Purchase item not found
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
//Enter received quantity
router.post("/receive-quantity", purchaseItemController.receivedQuantity);

/**
 * @swagger
 * /api/purchase-item/return:
 *   patch:
 *     summary: Return a purchase item
 *     description: Mark a purchase item as returned and specify the return quantity.
 *     tags: [Purchase Items]
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: purchaseItem
 *         required: true
 *         schema:
 *           $ref: "#/components/schemas/PurchaseItem"
 *     responses:
 *       200:
 *         description: Product returned quantity added
 *       404:
 *         description: Purchase item not found
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
//return product
router.patch("/return", purchaseItemController.returnProduct);

/**
 * @swagger
 * /api/purchase-item/returned-product/{vendorId}:
 *   get:
 *     summary: Retrieve all returned purchase items by vendor ID
 *     description: Get a list of all purchase items returned by a specific vendor.
 *     tags: [Purchase Items]
 *     parameters:
 *       - in: path
 *         name: vendorId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the vendor whose returned items are to be retrieved.
 *     responses:
 *       200:
 *         description: Successfully retrieved returned items
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
 *                     $ref: "#/components/schemas/PurchaseItem"
 *       404:
 *         description: Vendor not found or no returned items available
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
//retrive all the returned product
router.get(
  "/returned-product/:vendorId",
  purchaseItemController.allReturnedProductList
);

/**
 * @swagger
 * /api/purchase-item/vendor-list/{productId}:
 *   get:
 *     summary: Retrieve all vendors selling a specific product
 *     description: Get a list of all vendors selling a specific product by its ID.
 *     tags: [Purchase Items]
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product whose vendors are to be retrieved.
 *     responses:
 *       200:
 *         description: Successfully retrieved vendor list
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
 *                     type: object
 *                     properties:
 *                       vendorId:
 *                         type: string
 *                         description: The ID of the vendor associated with the product.
 *                       vendorName:
 *                         type: string
 *                         description: The name of the vendor associated with the product.
 *                       pricePerUnit:
 *                         type: number
 *                         description: The price per unit set by the vendor for the product.
 *                       isReturn:
 *                         type: boolean
 *                         description: A flag indicating if the product is returnable by the vendor.
 *                       returnQuantity:
 *                         type: number
 *                         description: The quantity of the product that has been returned to the vendor.
 *       404:
 *         description: Product not found or no vendors available
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
//retrive all the vendor list of particular product
router.get("/vendor-list/:productId", purchaseItemController.vendorList);

module.exports = router;
