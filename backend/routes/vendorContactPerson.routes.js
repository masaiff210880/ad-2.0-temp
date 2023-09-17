const express = require("express");
const router = express.Router();

const vendorContactPersonController = require("../controller/vendorContactPerson.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     VendorContactPerson:
 *       type: object
 *       properties:
 *         salutation:
 *           type: string
 *           description: The salutation of the contact person.
 *         firstName:
 *           type: string
 *           description: The first name of the contact person.
 *         lastName:
 *           type: string
 *           description: The last name of the contact person.
 *         email:
 *           type: string
 *           description: The email of the contact person.
 *         workPhone:
 *           type: number
 *           description: The work phone number of the contact person.
 *         mobile:
 *           type: number
 *           description: The mobile number of the contact person.
 *         skypeNumber:
 *           type: string
 *           description: The Skype number of the contact person.
 *         desgnation:
 *           type: string
 *           description: The designation of the contact person.
 *         department:
 *           type: string
 *           description: The department of the contact person.
 *         vendorId:
 *           type: string
 *           description: The ID of the vendor associated with the contact person.
 *       required:
 *         - salutation
 */

/**
 * @swagger
 * tags:
 *   name: Vendor Contact Person
 *   description: APIs related to Vendor Contact Person
 */

/**
 * @swagger
 * /api/contact/create/{vendorId}:
 *   post:
 *     summary: Create a vendor contact person
 *     description: Create a new vendor contact person associated with a specific vendor.
 *     tags: [Vendor Contact Person]
 *     parameters:
 *       - in: path
 *         name: vendorId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the vendor to associate with the contact person.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VendorContactPerson'
 *     responses:
 *       200:
 *         description: Contact person added successfully
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
 *                   $ref: '#/components/schemas/VendorContactPerson'
 *       404:
 *         description: Vendor not found, please add it first
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
// Create a new vendor contact person
router.post(
  "/create/:vendorId",
  vendorContactPersonController.createContactPerson
);

/**
 * @swagger
 * /api/contact/edit/{contactId}:
 *   patch:
 *     summary: Edit a vendor contact person
 *     description: Edit a specific vendor contact person by ID.
 *     tags: [Vendor Contact Person]
 *     parameters:
 *       - in: path
 *         name: contactId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the vendor contact person to be edited.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VendorContactPerson'
 *     responses:
 *       200:
 *         description: Contact person edited successfully
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
 *         description: Contact person not found
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
// Create a new vendor contact person
router.patch(
  "/edit/:contactId",
  vendorContactPersonController.editContactPerson
);

/**
 * @swagger
 * /api/contact/delete/{contactId}:
 *   delete:
 *     summary: Delete a vendor contact person
 *     description: Delete a specific vendor contact person by ID.
 *     tags: [Vendor Contact Person]
 *     parameters:
 *       - in: path
 *         name: contactId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the vendor contact person to be deleted.
 *     responses:
 *       200:
 *         description: Contact person deleted successfully
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
 *         description: Contact person not found
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
// Create a new vendor contact person
router.delete(
  "/delete/:contactId",
  vendorContactPersonController.deleteContactPerson
);

/**
 * @swagger
 * /api/contact/view/{vendorId}:
 *   get:
 *     summary: Get all contact persons of a vendor
 *     description: Retrieve all contact persons associated with a specific vendor.
 *     tags: [Vendor Contact Person]
 *     parameters:
 *       - in: path
 *         name: vendorId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the vendor to get contact persons from.
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
 *                     $ref: '#/components/schemas/VendorContactPerson'
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
// Create a new vendor contact person
router.get("/view/:vendorId", vendorContactPersonController.getContactPerson);

module.exports = router;
