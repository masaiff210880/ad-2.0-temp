const express = require("express");
const disbursementController = require("../controller/disbursement.controller");
// router
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Disbursement:
 *       type: object
 *       properties:
 *         vendorId:
 *           type: string
 *           description: The ID of the vendor associated with the disbursement.
 *         purchaseOrderId:
 *           type: string
 *           description: The ID of the purchase order associated with the disbursement.
 *         purchaseItemId:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of purchase item IDs associated with the disbursement.
 *         transactionId:
 *           type: string
 *           description: The transaction ID for the disbursement.
 *         transactionDate:
 *           type: string
 *           format: date
 *           description: The date of the disbursement transaction.
 *         paymentId:
 *           type: string
 *           description: The payment ID for the disbursement.
 *         paymentDate:
 *           type: string
 *           format: date
 *           description: The date of the disbursement payment.
 *         bankAccount:
 *           type: string
 *           description: The bank account used for the disbursement.
 *         checkNumber:
 *           type: string
 *           description: The check number for the disbursement (if applicable).
 *         employee:
 *           type: string
 *           description: The employee associated with the disbursement.
 *         location:
 *           type: string
 *           description: The location of the disbursement.
 *         totalDisburded:
 *           type: number
 *           description: The total amount disbursed.
 *         totalAmount:
 *           type: number
 *           description: The total amount for the disbursement.
 *         amountPaid:
 *           type: number
 *           description: The amount paid in the disbursement.
 *         unappliedDeposits:
 *           type: number
 *           description: The unapplied deposits for the disbursement.
 *         poDeposits:
 *           type: number
 *           description: The deposits related to the purchase order.
 *         paymentMemo:
 *           type: string
 *           description: The payment memo or notes for the disbursement.
 *         reApplyStatus:
 *           type: string
 *           description: The status of re-application of disbursement.
 *         reConciled:
 *           type: string
 *           description: The status of reconciliation of the disbursement.
 *         auditTrail:
 *           type: string
 *           description: The audit trail for the disbursement.
 *       required:
 *         - vendorId
 */

/**
 * @swagger
 * tags:
 *   name: Disbursement
 *   description: APIs related to Disbursement
 */

/**
 * @swagger
 * /api/disbursh/create-disbursh/{disbursementId}:
 *   patch:
 *     summary: Update the disbursement details after creation
 *     tags: [Disbursement]
 *     parameters:
 *       - in: path
 *         name: disbursementId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the disbursement to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paymentId:
 *                 type: string
 *                 description: The payment ID for the disbursement.
 *               paymentDate:
 *                 type: string
 *                 format: date
 *                 description: The date of the disbursement payment.
 *               bankAccount:
 *                 type: string
 *                 description: The bank account used for the disbursement.
 *               checkNumber:
 *                 type: string
 *                 description: The check number for the disbursement (if applicable).
 *               unappliedDeposits:
 *                 type: number
 *                 description: The unapplied deposits for the disbursement.
 *               poDeposits:
 *                 type: number
 *                 description: The deposits related to the purchase order.
 *               reApplyStatus:
 *                 type: string
 *                 description: The status of re-application of disbursement.
 *               auditTrail:
 *                 type: string
 *                 description: The audit trail for the disbursement.
 *             required:
 *               - paymentId
 *               - paymentDate
 *               - bankAccount
 *               - checkNumber
 *               - unappliedDeposits
 *               - poDeposits
 *               - reApplyStatus
 *               - auditTrail
 *     responses:
 *       200:
 *         description: Disbursement updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Disbursement not found, Please generate PO first
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
//update after creation, it creates automatic while product order creation
router.patch(
  "/create-disbursh/:disbursementId",
  disbursementController.updateDisbursement
);

/**
 * @swagger
 * /api/disbursh/all-disbursh:
 *   get:
 *     summary: Get all disbursements for a vendor
 *     tags: [Disbursement]
 *     parameters:
 *       - in: query
 *         name: vendorId
 *         schema:
 *           type: string
 *         description: The ID of the vendor to retrieve disbursements for.
 *     responses:
 *       200:
 *         description: Disbursements retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Disbursement'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
//get disburse for 1 vendor
router.get("/all-disbursh", disbursementController.disbursementOfOneVendor);

/**
 * @swagger
 * /api/disbursh/one-disbursh/{disbursementId}:
 *   get:
 *     summary: Get details of a single disbursement
 *     tags: [Disbursement]
 *     parameters:
 *       - in: path
 *         name: disbursementId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the disbursement to retrieve details for.
 *     responses:
 *       200:
 *         description: Disbursement details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Disbursement'
 *       404:
 *         description: Disbursement not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
//get 1 disburse details
router.get(
  "/one-disbursh/:disbursementId",
  disbursementController.oneDisbursementDetails
);

module.exports = router;
