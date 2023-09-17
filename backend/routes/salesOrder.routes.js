const express = require("express");
const router = express.Router();
const salesOrderController = require("../controller/salesOrder.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     SalesOrder:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           description: The ID of the user associated with the sales order.
 *         uniqueId:
 *           type: string
 *           description: The unique ID of the sales order.
 *         orderItemId:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of order item IDs associated with the sales order.
 *         orderId:
 *           type: string
 *           description: The ID of the main order associated with the sales order.
 *         orderFullfillmentId:
 *           type: string
 *           description: The ID of the order fulfillment associated with the sales order.
 *         phase:
 *           type: string
 *           description: The phase of the sales order.
 *         refrence:
 *           type: string
 *           description: The reference of the sales order.
 *         orderStatus:
 *           type: string
 *           description: The status of the sales order.
 *         name:
 *           type: string
 *           description: The name associated with the sales order.
 *         assignedTo:
 *           type: string
 *           description: The name of the person assigned to the sales order.
 *         assignedBy:
 *           type: string
 *           description: The ID of the user who assigned the sales order.
 *         isPickedAllItems:
 *           type: boolean
 *           description: A flag indicating if all items in the sales order have been picked.
 *         isVerifiedAllItems:
 *           type: boolean
 *           description: A flag indicating if all items in the sales order have been verified.
 *         isPacked:
 *           type: boolean
 *           description: A flag indicating if the sales order has been packed.
 *         isShipped:
 *           type: boolean
 *           description: A flag indicating if the sales order has been shipped.
 *         isInvoice:
 *           type: boolean
 *           description: A flag indicating if the sales order has been invoiced.
 *         billTo:
 *           type: string
 *           description: The bill-to address associated with the sales order.
 *         accountNo:
 *           type: number
 *           description: The account number associated with the sales order.
 *         orderReceivedDate:
 *           type: string
 *           format: date-time
 *           description: The date the sales order was received.
 *         orderFilledDate:
 *           type: string
 *           format: date-time
 *           description: The date the sales order was filled.
 *         isFlatRate:
 *           type: boolean
 *           description: A flag indicating if the sales order has a flat rate.
 *         flatRate:
 *           type: number
 *           description: The flat rate amount for the sales order.
 *         paymentTerms:
 *           type: string
 *           description: The payment terms for the sales order.
 *         totalAmount:
 *           type: number
 *           description: The total amount of the sales order.
 *         grandTotalAmount:
 *           type: number
 *           description: The grand total amount of the sales order.
 *         depositAmount:
 *           type: number
 *           description: The deposit amount for the sales order.
 *         balanceAmount:
 *           type: number
 *           description: The balance amount for the sales order.
 *         tax:
 *           type: number
 *           description: The tax amount for the sales order.
 *         isFullPaid:
 *           type: boolean
 *           description: A flag indicating if the sales order has been fully paid.
 *         isManagerAllowed:
 *           type: boolean
 *           description: A flag indicating if a manager is allowed for the sales order.
 *         allowingManagerId:
 *           type: string
 *           description: The ID of the manager who is allowed for the sales order.
 *         memo:
 *           type: string
 *           description: Any additional notes or comments for the sales order.
 *       required:
 *         - userId
 *         - uniqueId
 *         - orderStatus
 *         - paymentTerms
 *         - totalAmount
 */

/**
 * @swagger
 * tags:
 *   name: Sales Orders
 *   description: APIs related to sales orders
 */

/**
 * @swagger
 * /api/sales/sales-order:
 *   get:
 *     summary: Retrieve all sales orders
 *     description: Get a list of all sales orders with basic details.
 *     tags: [Sales Orders]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: false
 *         description: ID of the user to filter sales orders by user.
 *       - in: query
 *         name: uniqueId
 *         schema:
 *           type: string
 *         required: false
 *         description: Unique ID of the sales order to filter sales orders by unique ID.
 *       - in: query
 *         name: orderStatus
 *         schema:
 *           type: string
 *         required: false
 *         description: Status of the sales order to filter sales orders by status.
 *     responses:
 *       200:
 *         description: Successfully retrieved sales orders
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
 *                     $ref: "#/components/schemas/SalesOrder"
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
// get the sales order
router.get("/sales-order", salesOrderController.viewSalesOrder);

/**
 * @swagger
 * /api/sales/sales-order-details/{salesOrderId}:
 *   get:
 *     summary: Retrieve details of a sales order
 *     description: Get the details of a specific sales order by its ID.
 *     tags: [Sales Orders]
 *     parameters:
 *       - in: path
 *         name: salesOrderId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the sales order to retrieve details.
 *     responses:
 *       200:
 *         description: Successfully retrieved sales order details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   default: true
 *                 data:
 *                   $ref: "#/components/schemas/SalesOrder"
 *       404:
 *         description: Sales order not found
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
// get any order details
router.get(
  "/sales-order-details/:salesOrderId",
  salesOrderController.salesOrderDetails
);

router.patch("/pick-start/:salesOrderId", salesOrderController.pickingStarted);

router.patch("/pick-done", salesOrderController.pickingCompleted);

/**
 * @swagger
 * /api/sales/assign-picker:
 *   patch:
 *     summary: Assign a picker to a sales order
 *     description: Assign a picker to a specific sales order for picking the material.
 *     tags: [Sales Orders]
 *     parameters:
 *       - in: body
 *         name: assignment
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             user:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 userName:
 *                   type: string
 *               description: The user information of the person assigning the order.
 *             salesOrderId:
 *               type: string
 *               description: ID of the sales order to assign the picker to.
 *             employee:
 *               type: string
 *               description: The name of the person to assign as a picker.
 *     responses:
 *       200:
 *         description: Sales order successfully assigned to the picker
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
 *         description: Sales order not found
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
//assign to picker for pick the material
router.patch("/assign-picker", salesOrderController.assignPicker);

/**
 * @swagger
 * /api/sales/picker-order:
 *   patch:
 *     summary: Retrieve all orders for a picker
 *     description: Get a list of all sales orders assigned to a specific picker.
 *     tags: [Sales Orders]
 *     parameters:
 *       - in: body
 *         name: picker
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             user:
 *               type: object
 *               properties:
 *                 userName:
 *                   type: string
 *               description: The user information of the picker.
 *     responses:
 *       200:
 *         description: Successfully retrieved sales orders for the picker
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
 *                     $ref: "#/components/schemas/SalesOrder"
 *       404:
 *         description: No sales orders assigned to the picker
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
//get all their order to individuals pickerman
router.get("/picker-order", salesOrderController.pickerAllOrder);

/**
 * @swagger
 * /api/sales/verifier-order:
 *   patch:
 *     summary: Retrieve all orders for a verifier
 *     description: Get a list of all sales orders pending verification.
 *     tags: [Sales Orders]
 *     responses:
 *       200:
 *         description: Successfully retrieved sales orders pending verification
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
 *                     $ref: "#/components/schemas/SalesOrder"
 *       404:
 *         description: No sales orders pending verification
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
//get all pending order for verify
router.patch("/verifier-order", salesOrderController.verifierAllData);

/**
 * @swagger
 * /api/sales/update/{salesOrderId}:
 *   patch:
 *     summary: Update a sales order
 *     description: Update the details of a specific sales order by its ID.
 *     tags: [Sales Orders]
 *     parameters:
 *       - in: path
 *         name: salesOrderId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the sales order to update.
 *       - in: body
 *         name: salesOrder
 *         required: true
 *         schema:
 *           $ref: "#/components/schemas/SalesOrder"
 *     responses:
 *       200:
 *         description: Sales order updated successfully
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
 *         description: Sales order not found
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
//update SalesOrder
router.patch("/update/:salesOrderId", salesOrderController.updateSalesOrder);

/**
 * @swagger
 * /api/sales/allow-by-manager/{salesOrderId}:
 *   patch:
 *     summary: Allow a sales order by manager
 *     description: Allow a sales order for further processing by a manager.
 *     tags: [Sales Orders]
 *     parameters:
 *       - in: path
 *         name: salesOrderId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the sales order to allow.
 *       - in: body
 *         name: manager
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             user:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *               description: The user information of the manager allowing the order.
 *     responses:
 *       200:
 *         description: Sales order allowed by the manager
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
 *         description: Sales order not found
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

router.patch(
  "/allow-by-manager/:salesOrderId",
  salesOrderController.allowByManager
);

module.exports = router;
