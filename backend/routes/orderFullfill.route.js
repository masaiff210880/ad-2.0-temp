const express = require("express");
const router = express.Router();
const orderFullfillController = require("../controller/orderFullfill.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     OrderFulfillment:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           description: The ID of the user associated with the order fulfillment.
 *         uniqueId:
 *           type: string
 *           description: The unique ID for the order fulfillment (must be unique).
 *         orderItemId:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of order item IDs associated with the fulfillment.
 *         orderId:
 *           type: string
 *           description: The ID of the main order associated with the fulfillment.
 *         salesOrderId:
 *           type: string
 *           description: The ID of the sales order associated with the fulfillment.
 *         totalBoxes:
 *           type: number
 *           description: The total number of boxes for the fulfillment.
 *         lengthOfEachBox:
 *           type: number
 *           description: The length of each box in the fulfillment.
 *         widthOfEachBox:
 *           type: number
 *           description: The width of each box in the fulfillment.
 *         heightOfEachBox:
 *           type: number
 *           description: The height of each box in the fulfillment.
 *         totalWeightOfBoxes:
 *           type: number
 *           description: The total weight of all boxes in the fulfillment.
 *         isPacked:
 *           type: boolean
 *           description: A flag indicating if the fulfillment is packed.
 *       required:
 *         - userId
 *         - uniqueId
 *         - orderId
 */

/**
 * @swagger
 * tags:
 *   name: OrderFulfillment
 *   description: APIs related to Order-Fulfillment
 */

/**
 * @swagger
 * /api/fullfill/fullfill-order:
 *   get:
 *     summary: Get all order fulfillments
 *     tags: [OrderFulfillment]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: The ID of the user associated with the order fulfillment (optional).
 *       - in: query
 *         name: uniqueId
 *         schema:
 *           type: string
 *         description: The unique ID for the order fulfillment (optional).
 *     responses:
 *       200:
 *         description: Successfully retrieved all order fulfillments
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
//get all fullfill order
router.get("/fullfill-order", orderFullfillController.viewFullfillOrder);

/**
 * @swagger
 * /api/fullfill/create-order:
 *   post:
 *     summary: Create a new order fulfillment
 *     tags: [OrderFulfillment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               salesOrderId:
 *                 type: string
 *                 description: The ID of the sales order for which to create the fulfillment.
 *             required:
 *               - salesOrderId
 *     responses:
 *       200:
 *         description: Order fulfillment process started
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Sales Order not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Manager not allowed to this order
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
//create fullfill order
router.post("/create-order", orderFullfillController.createFullfillOrder);

/**
 * @swagger
 * /api/fullfill/fullfill-details/{fullfillId}:
 *   get:
 *     summary: Get details of a specific order fulfillment
 *     tags: [OrderFulfillment]
 *     parameters:
 *       - in: path
 *         name: fullfillId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the order fulfillment to retrieve details for.
 *     responses:
 *       200:
 *         description: Successfully retrieved order fulfillment details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Fulfill Order not found
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
//get one fullfill order with details
router.get(
  "/fullfill-details/:fullfillId",
  orderFullfillController.viewFullfillOrderDetails
);

/**
 * @swagger
 * /api/fullfill/packing/{fullfillId}:
 *   patch:
 *     summary: Insert packing details for a specific order fulfillment
 *     tags: [OrderFulfillment]
 *     parameters:
 *       - in: path
 *         name: fullfillId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the order fulfillment for which to insert packing details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               totalBoxes:
 *                 type: number
 *                 description: The total number of boxes for the fulfillment.
 *               lengthOfEachBox:
 *                 type: number
 *                 description: The length of each box in the fulfillment.
 *               widthOfEachBox:
 *                 type: number
 *                 description: The width of each box in the fulfillment.
 *               heightOfEachBox:
 *                 type: number
 *                 description: The height of each box in the fulfillment.
 *               totalWeightOfBoxes:
 *                 type: number
 *                 description: The total weight of all boxes in the fulfillment.
 *               isPacked:
 *                 type: boolean
 *                 description: A flag indicating if the fulfillment is packed.
 *             required:
 *               - totalBoxes
 *               - lengthOfEachBox
 *               - widthOfEachBox
 *               - heightOfEachBox
 *               - totalWeightOfBoxes
 *               - isPacked
 *     responses:
 *       200:
 *         description: Packing data saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Fulfill Order not found
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
//giving all packing details
router.patch(
  "/packing/:fullfillId",
  orderFullfillController.insertPackingDetails
);

/**
 * @swagger
 * /api/fullfill/packed-order:
 *   get:
 *     summary: Get all packed order fulfillments
 *     tags: [OrderFulfillment]
 *     responses:
 *       200:
 *         description: Successfully retrieved all packed order fulfillments
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
//get all packed order data
router.get("/packed-order", orderFullfillController.getAllPackedOrder);

/**
 * @swagger
 * /api/fullfill/unpacked-order:
 *   get:
 *     summary: Get all unpacked order fulfillments
 *     tags: [OrderFulfillment]
 *     responses:
 *       200:
 *         description: Successfully retrieved all unpacked order fulfillments
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
//get all un-packed order data
router.get("/unpacked-order", orderFullfillController.getAllUnpackedOrder);

/**
 * @swagger
 * /api/fullfill/update/{orderId}:
 *   patch:
 *     summary: Update order fulfillment details
 *     tags: [OrderFulfillment]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the order fulfillment to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderFulfillment'
 *     responses:
 *       200:
 *         description: Order fulfillment details updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Fulfill Order not found
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
//to update ordefullfill
router.patch("/update/:orderId", orderFullfillController.updateOrderFullfill);

/**
 * @swagger
 * /api/fullfill/delete/{orderId}:
 *   delete:
 *     summary: Delete order fulfillment
 *     tags: [OrderFulfillment]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the order fulfillment to delete.
 *     responses:
 *       200:
 *         description: Order fulfillment deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Fulfill Order not found
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
//to delete the order
router.delete("/delete/:orderId", orderFullfillController.deleteOrderFullfill);

module.exports = router;
