const express = require("express");
const orderController = require("../controller/order.controller");
// router
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           description: The ID of the user associated with the order.
 *         uniqueId:
 *           type: string
 *           description: The unique ID for the order (must be unique).
 *         orderItemId:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of order item IDs associated with the order.
 *         salesOrderId:
 *           type: string
 *           description: The ID of the sales order associated with the order.
 *         orderFullfillmentId:
 *           type: string
 *           description: The ID of the order fulfillment associated with the order.
 *         name:
 *           type: string
 *           description: The name of the customer placing the order.
 *         address:
 *           type: string
 *           description: The address for the delivery of the order.
 *         email:
 *           type: string
 *           description: The email address of the customer.
 *         contact:
 *           type: string
 *           description: The contact number of the customer.
 *         city:
 *           type: string
 *           description: The city for the delivery of the order.
 *         country:
 *           type: string
 *           description: The country for the delivery of the order.
 *         zipCode:
 *           type: string
 *           description: The ZIP code for the delivery address.
 *         totalAmount:
 *           type: number
 *           description: The total amount of the order.
 *         isPaid:
 *           type: boolean
 *           description: A flag indicating if the order has been paid.
 *         paymentMethod:
 *           type: string
 *           enum:
 *             - card
 *             - online
 *             - cod
 *           description: The payment method used for the order (card, online, or cash on delivery).
 *         orderNote:
 *           type: string
 *           description: Any additional notes or comments for the order.
 *         status:
 *           type: string
 *           enum:
 *             - Pending
 *             - Processing
 *             - Delivered
 *           description: The status of the order (Pending, Processing, or Delivered).
 *       required:
 *         - userId
 *         - uniqueId
 *         - orderItemId
 *         - paymentMethod
 */

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: APIs related to Order
 */

/**
 * @swagger
 * /api/order/create-order:
 *   post:
 *     summary: Create a new order
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 $ref: '#/components/schemas/User'
 *               cartId:
 *                 type: string
 *                 description: The ID of the cart from which to create the order.
 *               name:
 *                 type: string
 *                 description: The name of the customer placing the order.
 *               address:
 *                 type: string
 *                 description: The address for the delivery of the order.
 *               email:
 *                 type: string
 *                 description: The email address of the customer.
 *               refrence:
 *                 type: string
 *                 description: The reference for the order (if applicable).
 *               contact:
 *                 type: string
 *                 description: The contact number of the customer.
 *               city:
 *                 type: string
 *                 description: The city for the delivery of the order.
 *               country:
 *                 type: string
 *                 description: The country for the delivery of the order.
 *               zipCode:
 *                 type: string
 *                 description: The ZIP code for the delivery address.
 *               isPaid:
 *                 type: boolean
 *                 description: A flag indicating if the order has been paid.
 *               paymentMethod:
 *                 type: string
 *                 enum: [card, online, cod]
 *                 description: The payment method used for the order (card, online, or cash on delivery).
 *               orderNote:
 *                 type: string
 *                 description: Any additional notes or comments for the order.
 *               billTo:
 *                 type: string
 *                 description: The billing address for the order.
 *               accountNo:
 *                 type: string
 *                 description: The account number for the order (if applicable).
 *               paymentTerms:
 *                 type: string
 *                 description: The payment terms for the order.
 *               advanceAmount:
 *                 type: number
 *                 description: The advance amount paid for the order.
 *               memo:
 *                 type: string
 *                 description: Any memo or notes related to the order.
 *             required:
 *               - user
 *               - cartId
 *               - name
 *               - address
 *               - email
 *               - contact
 *               - city
 *               - country
 *               - zipCode
 *               - isPaid
 *               - paymentMethod
 *     responses:
 *       200:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Cart not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
//create order so it creates orderItem, order, and salesOrder
router.post("/create-order", orderController.createOrder);

module.exports = router;
