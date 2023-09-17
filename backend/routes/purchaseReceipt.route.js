const express = require("express");
const router = express.Router();
// internal
const purchaseReceiptController = require("../controller/purchaseReceipt.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     PurchaseReceipt:
 *       type: object
 *       properties:
 *         vendorId:
 *           type: string
 *           description: The ID of the vendor associated with the purchase receipt.
 *         purchaseOrderId:
 *           type: string
 *           description: The ID of the purchase order associated with the purchase receipt.
 *         purchaseItemId:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of purchase item IDs associated with the purchase receipt.
 *         transactionId:
 *           type: string
 *           description: The transaction ID for the purchase receipt.
 *         transactionDate:
 *           type: string
 *           format: date-time
 *           description: The date of the transaction for the purchase receipt.
 *         billReference:
 *           type: string
 *           description: The bill reference for the purchase receipt.
 *         paymentTerms:
 *           type: string
 *           description: The payment terms for the purchase receipt.
 *         dueDate:
 *           type: string
 *           format: date-time
 *           description: The due date for the payment of the purchase receipt.
 *         location:
 *           type: string
 *           description: The location associated with the purchase receipt.
 *         refPoPr:
 *           type: string
 *           description: The reference to the purchase order or purchase receipt.
 *         pieces:
 *           type: number
 *           description: The total number of pieces in the purchase receipt.
 *         employee:
 *           type: string
 *           description: The employee associated with the purchase receipt.
 *         totalAmount:
 *           type: number
 *           description: The total amount of the purchase receipt.
 *         depositeAmount:
 *           type: number
 *           description: The deposited amount for the purchase receipt.
 *         balanceAmount:
 *           type: number
 *           description: The balance amount for the purchase receipt.
 *         discountAmount:
 *           type: number
 *           description: The discount amount for the purchase receipt.
 *         freightAmount:
 *           type: number
 *           description: The freight amount for the purchase receipt.
 *         soRefrence:
 *           type: string
 *           description: The reference to the sales order for the purchase receipt.
 *         memo:
 *           type: string
 *           description: Any additional notes or comments for the purchase receipt.
 *         trackingNumber:
 *           type: string
 *           description: The tracking number for the purchase receipt.
 *       required:
 *         - vendorId
 *         - transactionDate
 *         - totalAmount
 */

/**
 * @swagger
 * tags:
 *   name: Purchase Receipts
 *   description: APIs related to purchase receipts
 */

/**
 * @swagger
 * /api/pr/create-pr/{poId}:
 *   post:
 *     summary: Create a new purchase receipt
 *     description: Create a new purchase receipt with the provided details and associate it with the given purchase order.
 *     tags: [Purchase Receipts]
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: poId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the purchase order to associate the purchase receipt with.
 *       - in: body
 *         name: purchaseReceipt
 *         required: true
 *         schema:
 *           $ref: "#/components/schemas/PurchaseReceipt"
 *     responses:
 *       200:
 *         description: Purchase receipt created successfully
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
 *                   $ref: "#/components/schemas/PurchaseReceipt"
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
router.post(
  "/create-pr/:poId",
  purchaseReceiptController.createPurchaseReceipt
);

/**
 * @swagger
 * /api/pr/all-pr:
 *   get:
 *     summary: Retrieve all purchase receipts for a vendor
 *     description: Get a list of all purchase receipts for a specific vendor.
 *     tags: [Purchase Receipts]
 *     parameters:
 *       - in: query
 *         name: vendorId
 *         schema:
 *           type: string
 *         required: false
 *         description: ID of the vendor to filter purchase receipts by vendor.
 *     responses:
 *       200:
 *         description: Successfully retrieved purchase receipts
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
 *                     $ref: "#/components/schemas/PurchaseReceipt"
 *       404:
 *         description: Vendor not found or no purchase receipts available
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
//get all pr of one vendor , send id in query
router.get("/all-pr", purchaseReceiptController.viewPurchaseReceiptOfOneVendor);

router.get(
  "/all-pr-create",
  purchaseReceiptController.createAllProductReceiptAsPerPO
);

/**
 * @swagger
 * /api/pr/one-pr/{prId}:
 *   get:
 *     summary: Retrieve details of a purchase receipt
 *     description: Get the details of a specific purchase receipt by its ID.
 *     tags: [Purchase Receipts]
 *     parameters:
 *       - in: path
 *         name: prId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the purchase receipt to retrieve details.
 *     responses:
 *       200:
 *         description: Successfully retrieved purchase receipt details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   default: true
 *                 data:
 *                   $ref: "#/components/schemas/PurchaseReceipt"
 *       404:
 *         description: Purchase receipt not found
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
//get 1 pr
router.get(
  "/one-pr/:prId",
  purchaseReceiptController.onePurchaseReceiptDetails
);

module.exports = router;
