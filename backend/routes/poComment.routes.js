const express = require("express");
const router = express.Router();

const poController = require("../controller/poComment.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         commentedBy:
 *           type: string
 *           description: The ID of the user who commented on the purchase order.
 *         commentedByName:
 *           type: string
 *           description: The name of the user who commented on the purchase order.
 *         poId:
 *           type: string
 *           description: The ID of the purchase order associated with the comment.
 *         comment:
 *           type: string
 *           description: The comment made on the purchase order.
 *       required:
 *         - commentedBy
 *         - poId
 *         - comment
 */

/**
 * @swagger
 * tags:
 *   name: Purchase Order Comments
 *   description: APIs related to purchase order comments
 */

/**
 * @swagger
 * /api/po/add/{poId}:
 *   post:
 *     summary: Add a new comment to a purchase order
 *     description: Add a new comment to a specific purchase order.
 *     tags: [Purchase Order Comments]
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
 *         description: ID of the purchase order to add a comment to.
 *       - in: body
 *         name: comment
 *         required: true
 *         schema:
 *           $ref: "#/components/schemas/Comment"
 *     responses:
 *       200:
 *         description: Comment added successfully
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
 */

router.post("/add/:poId", poController.doComment);

/**
 * @swagger
 * /api/po/get/{poId}:
 *   get:
 *     summary: Retrieve all comments for a purchase order
 *     description: Get a list of all comments for a specific purchase order.
 *     tags: [Purchase Order Comments]
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
 *         description: ID of the purchase order to retrieve comments for.
 *     responses:
 *       200:
 *         description: Successfully retrieved comments
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
 *                     $ref: "#/components/schemas/Comment"
 *       404:
 *         description: Purchase order not found or no comments available
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
router.get("/get/:poId", poController.getAllComments);

module.exports = router;
