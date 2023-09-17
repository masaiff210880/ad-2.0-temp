const express = require("express");
const router = express.Router();
// internal
const purchaseOrderController = require("../controller/purchaseOrder.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     PurchaseOrder:
 *       type: object
 *       properties:
 *         vendorId:
 *           type: string
 *           description: The ID of the vendor associated with the purchase order.
 *         purchaseReceiptId:
 *           type: string
 *           description: The ID of the purchase receipt associated with the purchase order.
 *         disbursementId:
 *           type: string
 *           description: The ID of the disbursement associated with the purchase order.
 *         purchaseItemId:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of purchase item IDs associated with the purchase order.
 *         transactionId:
 *           type: string
 *           description: The transaction ID for the purchase order.
 *         PoNumber:
 *           type: string
 *           description: The purchase order number.
 *         status:
 *           type: string
 *           description: The status of the purchase order.
 *         transactionDate:
 *           type: string
 *           format: date-time
 *           description: The date of the transaction for the purchase order.
 *         shipToAddress:
 *           type: string
 *           description: The shipping address for the purchase order.
 *         paymentTerms:
 *           type: string
 *           description: The payment terms for the purchase order.
 *         shipVia:
 *           type: string
 *           description: The shipping method for the purchase order.
 *         deliveryDate:
 *           type: string
 *           format: date-time
 *           description: The delivery date for the purchase order.
 *         dropShipInfo:
 *           type: string
 *           description: Dropship information for the purchase order.
 *         pieces:
 *           type: number
 *           description: The total number of pieces in the purchase order.
 *         employee:
 *           type: string
 *           description: The employee associated with the purchase order.
 *         totalAmount:
 *           type: number
 *           description: The total amount of the purchase order.
 *         depositeAmount:
 *           type: number
 *           description: The deposited amount for the purchase order.
 *         balanceAmount:
 *           type: number
 *           description: The balance amount for the purchase order.
 *         discountAmount:
 *           type: number
 *           description: The discount amount for the purchase order.
 *         soRefrence:
 *           type: string
 *           description: The reference to the sales order for the purchase order.
 *         memo:
 *           type: string
 *           description: Any additional notes or comments for the purchase order.
 *       required:
 *         - vendorId
 *         - PoNumber
 *         - status
 *         - transactionDate
 *         - totalAmount
 */

/**
 * @swagger
 * tags:
 *   name: Purchase Orders
 *   description: APIs related to purchase orders
 */

/**
 * @swagger
 * /api/po/generate-po:
 *   post:
 *     summary: Create a new purchase order
 *     description: Create a new purchase order with the provided details.
 *     tags: [Purchase Orders]
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: purchaseOrder
 *         required: true
 *         schema:
 *           $ref: "#/components/schemas/PurchaseOrder"
 *     responses:
 *       200:
 *         description: Purchase order created successfully
 *       400:
 *         description: Bad request. Some required fields may be missing or invalid.
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
 *         description: Internal server error
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
router.post("/generate-po", purchaseOrderController.createPurchaseOrder);
router.post("/generate-all-po", purchaseOrderController.createMultiplePO);

/**
 * @swagger
 * /api/po/all-po:
 *   get:
 *     summary: Retrieve all purchase orders for a vendor
 *     description: Get a list of all purchase orders for a specific vendor.
 *     tags: [Purchase Orders]
 *     parameters:
 *       - in: query
 *         name: vendorId
 *         schema:
 *           type: string
 *         required: false
 *         description: ID of the vendor to filter purchase orders by vendor.
 *     responses:
 *       200:
 *         description: Successfully retrieved purchase orders
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
 *                     $ref: "#/components/schemas/PurchaseOrder"
 *       404:
 *         description: Vendor not found or no purchase orders available
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
//get all po for 1 vendor
router.get("/all-po", purchaseOrderController.viewPurchaseOrderOfOneVendor);
router.get("/balance", purchaseOrderController.addBalance);

/**
 * @swagger
 * /api/po/one-po/{poId}:
 *   get:
 *     summary: Retrieve details of a purchase order
 *     description: Get the details of a specific purchase order by its ID.
 *     tags: [Purchase Orders]
 *     parameters:
 *       - in: path
 *         name: poId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the purchase order to retrieve details.
 *     responses:
 *       200:
 *         description: Successfully retrieved purchase order details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   default: true
 *                 data:
 *                   $ref: "#/components/schemas/PurchaseOrder"
 *       404:
 *         description: Purchase order not found
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
//get 1 po
router.get("/one-po/:poId", purchaseOrderController.onePurchaseOrderDetails);

router.delete("/delete/:poId", purchaseOrderController.deletePurchaseOrder);

module.exports = router;
