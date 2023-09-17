const express = require("express");
const router = express.Router();
// internal
const cartController = require("../controller/cart.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           description: The ID of the user who owns the cart.
 *         cartItem:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CartItem'
 *           description: An array of items in the cart.
 *         tax:
 *           type: number
 *           description: The total tax amount for the cart.
 *         isFlatRate:
 *           type: boolean
 *           description: A flag indicating if the cart has a flat rate for shipping.
 *         flatRate:
 *           type: number
 *           description: The flat rate for shipping.
 *         totalAmount:
 *           type: number
 *           description: The total amount of all items in the cart.
 *         grandTotalAmount:
 *           type: number
 *           description: The grand total amount including tax and shipping.
 *       required:
 *         - userId
 *         - cartItem
 *
 *     CartItem:
 *       type: object
 *       properties:
 *         productId:
 *           type: string
 *           description: The ID of the product in the cart.
 *         variantId:
 *           type: string
 *           description: The ID of the product variant (if applicable) in the cart.
 *         quantity:
 *           type: number
 *           description: The quantity of the product in the cart.
 *         price:
 *           type: number
 *           description: The price of the product.
 *         subTotal:
 *           type: number
 *           description: The subtotal for the item (quantity * price).
 *       required:
 *         - productId
 *         - quantity
 *
 *     AddToCartRequest:
 *       type: object
 *       properties:
 *         productId:
 *           type: string
 *           description: The ID of the product to add to the cart.
 *         quantity:
 *           type: number
 *           description: The quantity of the product to add to the cart.
 *       required:
 *         - productId
 *         - quantity
 *
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: A descriptive success message.
 *       required:
 *         - message
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: A descriptive error message.
 *       required:
 *         - message
 */

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: APIs related to Cart
 */

/**
 * @swagger
 * /api/cart/add-cart:
 *   post:
 *     summary: Add items to the cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddToCartRequest'
 *     responses:
 *       200:
 *         description: Products added to the cart
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/add-cart", cartController.addToCart);

/**
 * @swagger
 * /api/cart/emptyCart/{id}:
 *   get:
 *     summary: Empty the cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the cart to be emptied
 *     responses:
 *       200:
 *         description: Cart has been emptied successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete("/empty-cart/:id", cartController.emptyCart); //send cart id in params

/**
 * @swagger
 * /api/cart/cart:
 *   get:
 *     summary: View the user's cart
 *     tags: [Cart]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User's cart retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       404:
 *         description: Cart not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/cart", cartController.viewCart);

/**
 * @swagger
 * /api/cart/update:
 *   patch:
 *     summary: Update the quantity of a cart item
 *     tags: [Cart]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cartId:
 *                 type: string
 *                 description: The ID of the cart
 *               cartItemId:
 *                 type: string
 *                 description: The ID of the cart item to be updated
 *               quantity:
 *                 type: number
 *                 description: The updated quantity for the cart item
 *             required:
 *               - cartId
 *               - cartItemId
 *               - quantity
 *     responses:
 *       200:
 *         description: Cart item quantity updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Cart item or Cart not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.patch("/update", cartController.updateCartItem);

/**
 * @swagger
 * /api/cart/final-cart:
 *   patch:
 *     summary: Finalize the cart
 *     tags: [Cart]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The ID of the user
 *                   userType:
 *                     type: string
 *                     description: The type of user
 *             required:
 *               - user
 *     responses:
 *       200:
 *         description: Cart finalized successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       404:
 *         description: Cart not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.patch("/final-cart", cartController.finalCart);

/**
 * @swagger
 * /api/cart/shareCart/{foreignId}:
 *   get:
 *     summary: View a shared cart
 *     tags: [Cart]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: foreignId
 *         in: path
 *         description: The ID of the user who wants to share the cart
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Shared cart retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       404:
 *         description: Cart not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/shareCart/:foreignId", cartController.viewCart); //send user _id(who wants to share the cart) in params

router.patch("/delete-item", cartController.deleteOneItemInCart); //delete one item from all cart items

module.exports = router;
