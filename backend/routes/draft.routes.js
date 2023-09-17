const express = require("express");
const router = express.Router();
// internal
const draftController = require("../controller/draft.controller");

//add product
router.post("/add", draftController.addToDraft);

// get all products
router.get("/all", draftController.getAllDrafts);

//get one particular product with all variants
router.get("/one/:draftId", draftController.getOneDraft);

// update one product
router.patch("/update/:draftId", draftController.updateDraft);

// delete one product with all variants
router.delete("/delete/:draftId", draftController.deleteDraft);

// delete one galleryImage from draft
router.delete(
  "/delete-one-image/:draftId",
  draftController.deleteOneGalleryImage
);

// delete all galleryImage from draft
router.delete(
  "/delete-all-image/:draftId",
  draftController.deleteAllGalleryImage
);

module.exports = router;
