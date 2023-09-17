const express = require("express");
const router = express.Router();

const vendorController = require("../controller/vendor.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     Vendor:
 *       type: object
 *       properties:
 *         vendorUniqueId:
 *           type: string
 *           description: The unique identifier for the vendor.
 *         vendorContactPersonId:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of vendor contact person IDs associated with the vendor.
 *         isInternationalVendor:
 *           type: boolean
 *           description: A flag indicating if the vendor is an international vendor.
 *         companyName:
 *           type: string
 *           description: The name of the company.
 *         vendorType:
 *           type: string
 *           description: The type of the vendor.
 *         salutation:
 *           type: string
 *           description: The salutation of the vendor contact person.
 *         firstName:
 *           type: string
 *           description: The first name of the vendor contact person.
 *         lastName:
 *           type: string
 *           description: The last name of the vendor contact person.
 *         attention:
 *           type: string
 *           description: The attention name for the vendor.
 *         address:
 *           type: string
 *           description: The address of the vendor.
 *         city:
 *           type: string
 *           description: The city of the vendor.
 *         country:
 *           type: string
 *           description: The country of the vendor.
 *         state:
 *           type: string
 *           description: The state of the vendor.
 *         pinCode:
 *           type: string
 *           description: The pin code of the vendor.
 *         displayName:
 *           type: string
 *           description: The display name of the vendor.
 *         workPhone:
 *           type: number
 *           description: The work phone number of the vendor.
 *         mobile:
 *           type: number
 *           description: The mobile number of the vendor.
 *         phone:
 *           type: number
 *           description: The phone number of the vendor.
 *         vendorEmail:
 *           type: string
 *           description: The email of the vendor.
 *         fax:
 *           type: string
 *           description: The fax number of the vendor.
 *         paymentTerms:
 *           type: string
 *           description: The payment terms for the vendor.
 *         currency:
 *           type: string
 *           description: The currency used by the vendor.
 *         priceList:
 *           type: string
 *           description: The price list associated with the vendor.
 *         facebook:
 *           type: string
 *           description: The Facebook URL of the vendor.
 *         twitter:
 *           type: string
 *           description: The Twitter URL of the vendor.
 *       required:
 *         - vendorUniqueId
 */

/**
 * @swagger
 * tags:
 *   name: Vendors
 *   description: APIs related to Vendors
 */

/**
 * @swagger
 * /api/vendor/create-vendor:
 *   post:
 *     summary: Create a new vendor
 *     description: Create a new vendor with the provided data.
 *     tags: [Vendors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vendor'
 *     responses:
 *       201:
 *         description: Vendor created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   default: true
 *                 data:
 *                   $ref: '#/components/schemas/Vendor'
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
// Create a new vendor
router.post("/create-vendor", vendorController.createVendor);

/**
 * @swagger
 * /api/vendor/all-vendor:
 *   get:
 *     summary: Get all vendors
 *     description: Get all vendors with optional filtering using query parameters.
 *     tags: [Vendors]
 *     parameters:
 *       - in: query
 *         name: vendorType
 *         schema:
 *           type: string
 *         description: Filter vendors by type (e.g., Supplier, Manufacturer).
 *     responses:
 *       200:
 *         description: Success
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
 *                     $ref: '#/components/schemas/Vendor'
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
// Get all vendors data
router.get("/all-vendor", vendorController.allVendor);

/**
 * @swagger
 * /api/vendor/one-vendor/{vendorId}:
 *   get:
 *     summary: Get a specific vendor
 *     description: Get a specific vendor by ID.
 *     tags: [Vendors]
 *     parameters:
 *       - in: path
 *         name: vendorId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the vendor to be retrieved.
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   default: true
 *                 data:
 *                   $ref: '#/components/schemas/Vendor'
 *       404:
 *         description: Vendor not found
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
// Get a specific vendor by ID
router.get("/one-vendor/:vendorId", vendorController.getOneVendor);

/**
 * @swagger
 * /api/vendor/update-vendor/{vendorId}:
 *   patch:
 *     summary: Update a vendor
 *     description: Update a specific vendor by ID.
 *     tags: [Vendors]
 *     parameters:
 *       - in: path
 *         name: vendorId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the vendor to be updated.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vendor'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   default: true
 *                 data:
 *                   $ref: '#/components/schemas/Vendor'
 *       404:
 *         description: Vendor not found
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
 *                 error:
 *                   type: string
 */
// Update a vendor by ID
router.patch("/update-vendor/:vendorId", vendorController.updateVendor);

/**
 * @swagger
 * /api/vendor/delete-vendor/{vendorId}:
 *   delete:
 *     summary: Delete a vendor
 *     description: Delete a specific vendor by ID.
 *     tags: [Vendors]
 *     parameters:
 *       - in: path
 *         name: vendorId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the vendor to be deleted.
 *     responses:
 *       200:
 *         description: Vendor deleted successfully
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
 *         description: Vendor not found
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
 *                 error:
 *                   type: string
 */
// Delete a vendor by ID
router.delete("/delete-vendor/:vendorId", vendorController.deleteVendor);

module.exports = router;
