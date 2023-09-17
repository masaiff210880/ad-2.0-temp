const express = require("express");
const router = express.Router();
const orderItemController = require("../controller/orderItem.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     OrderItem:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           description: The ID of the user associated with the order item.
 *         userType:
 *           type: string
 *           enum:
 *             - Silver
 *             - Gold
 *             - Platinum
 *           description: The user type for the order item (Silver, Gold, or Platinum).
 *         productId:
 *           type: string
 *           description: The ID of the product associated with the order item.
 *         variantId:
 *           type: string
 *           description: The ID of the product variant associated with the order item.
 *         quantity:
 *           type: number
 *           description: The quantity of the order item.
 *         pickedQuantity:
 *           type: number
 *           description: The quantity of the order item that has been picked.
 *         verifiedQuantity:
 *           type: number
 *           description: The quantity of the order item that has been verified.
 *         price:
 *           type: number
 *           description: The price of the order item.
 *         subTotal:
 *           type: number
 *           description: The subtotal for the order item (quantity * price).
 *       required:
 *         - userId
 *         - userType
 *         - productId
 *         - quantity
 */

/**
 * @swagger
 * tags:
 *   name: OrderItem
 *   description: APIs related to OrderItem
 */

/**
 * @swagger
 * /api/order-item/pick:
 *   patch:
 *     summary: Update the picked quantity for an order item
 *     tags: [OrderItem]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderItemId:
 *                 type: string
 *                 description: The ID of the order item to update.
 *               pickedQuantity:
 *                 type: number
 *                 description: The new picked quantity for the order item.
 *             required:
 *               - orderItemId
 *               - pickedQuantity
 *     responses:
 *       200:
 *         description: Picked quantity updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Item not found
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
//pick the quantity by pickerman
router.patch("/pick", orderItemController.pickedQuantity);

/**
 * @swagger
 * /api/order-item/verify:
 *   patch:
 *     summary: Update the verified quantity for an order item
 *     tags: [OrderItem]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderItemId:
 *                 type: string
 *                 description: The ID of the order item to update.
 *               verifiedQuantity:
 *                 type: number
 *                 description: The new verified quantity for the order item.
 *             required:
 *               - orderItemId
 *               - verifiedQuantity
 *     responses:
 *       200:
 *         description: Verified quantity updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Item not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       400:
 *         description: Picked Quantity does not match
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
//verify the quantity by verifier
router.patch("/verify", orderItemController.verifiedQuantity);

module.exports = router;
