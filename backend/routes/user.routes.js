const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         userName:
 *           type: string
 *           description: The username of the user.
 *         email:
 *           type: string
 *           description: The email address of the user.
 *         password:
 *           type: string
 *           description: The password of the user.
 *         firstName:
 *           type: string
 *           description: The first name of the user.
 *         lastName:
 *           type: string
 *           description: The last name of the user.
 *         phoneNumber:
 *           type: number
 *           description: The contact number of the user.
 *         role:
 *           type: string
 *           enum: [user, admin, superAdmin, masterAdmin]
 *           description: The role of the user.
 *         userType:
 *           type: string
 *           enum: [Silver, Gold, Platinum]
 *           description: The type of user (e.g., Silver, Gold, Platinum).
 *         avatar:
 *           type: string
 *           description: The avatar URL of the user.
 *         feinLicense:
 *           type: string
 *           description: The URL of the FEIN License image.
 *         feinNumber:
 *           type: number
 *           description: The FEIN License number.
 *         tobaccoLicense:
 *           type: string
 *           description: The URL of the Tobacco License image.
 *         businessLicense:
 *           type: string
 *           description: The URL of the Tax ID/Business License image.
 *         governmentIssuedId:
 *           type: string
 *           description: The URL of the Government issued ID image.
 *         storeType:
 *           type: string
 *           enum: [Distributor, Smoke/Vape, Chain, C-Store/Gas/Liq, Dispensary, Other]
 *           description: The type of the store.
 *         licenseFor:
 *           type: string
 *           enum: [Retailer, Wholesaler, Neither (Smoke shop only)]
 *           description: The license type.
 *         businessName:
 *           type: string
 *           description: The business name of the user.
 *         businessAddress:
 *           type: string
 *           description: The business address of the user.
 *         city:
 *           type: string
 *           description: The city of the user.
 *         state:
 *           type: string
 *           description: The state of the user.
 *         country:
 *           type: string
 *           description: The country of the user.
 *         isSignupWithGoogle:
 *           type: boolean
 *           description: A flag indicating if the user signed up with Google.
 *         isProfileVerifiedByAdmin:
 *           type: boolean
 *           description: A flag indicating if the user's profile is verified by an admin.
 *         verifiedAdminId:
 *           type: string
 *           description: The ID of the admin who verified the user's profile.
 *         loginDevices:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               deviceInfo:
 *                 type: string
 *               ipAddress:
 *                 type: string
 *               ipLocation:
 *                 type: string
 *           description: Information about the user's login devices.
 *         mailSentByAdmin:
 *           type: boolean
 *           description: A flag indicating if the user received an email sent by an admin.
 *         isUserCheckEmail:
 *           type: boolean
 *           description: A flag indicating if the user has checked their email.
 *         shippingAddress:
 *           type: string
 *           description: The shipping address of the user.
 *         creditAmount:
 *           type: number
 *           description: The credit amount of the user.
 *       required:
 *         - userName
 *         - email
 *         - firstName
 *         - lastName
 *         - role
 *         - userType
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: APIs related to User
 */

/**
 * @swagger
 * /api/user/signup:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with the provided details.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/User"
 *     responses:
 *       200:
 *         description: User registered successfully
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
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   default: false
 *                 error:
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
 *                 error:
 *                   type: string
 */
// add a user
router.post("/signup", userController.signup);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: User login
 *     description: Authenticate the user with provided login credentials.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User logged in successfully
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
 *                 userName:
 *                   type: string
 *                 token:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   default: false
 *                 error:
 *                   type: string
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   default: false
 *                 error:
 *                   type: string
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   default: false
 *                 error:
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
 *                 error:
 *                   type: string
 */
// login
router.post("/login", userController.login);

/**
 * @swagger
 * /api/user/logout:
 *   get:
 *     summary: User logout
 *     description: Log out the currently authenticated user.
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User logged out successfully
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
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   default: false
 *                 error:
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
 *                 error:
 *                   type: string
 */
// logout
router.get("/logout", userController.logout);

// forget-password
router.patch("/forget-password", userController.forgetPassword);

// confirm-forget-password
router.patch("/confirm-forget-password", userController.confirmForgetPassword);

// change password
router.patch("/change-password", userController.changePassword);

// confirmEmail
router.get("/confirmEmail/:token", userController.confirmEmail);

// updateUser
router.put("/update-user/:id", userController.updateUser);

// register or login with google
router.post("/register/:token", userController.signUpWithProvider);

module.exports = router;
