const express = require("express");
const router = express.Router();
const subCategoryController = require("../controller/subCategory.controller");

// add
router.post("/add", subCategoryController.addSubCategory);

//get all categories in priority wise
router.get("/all-priority", subCategoryController.getSubCategoriesByPriority);

//get one category by id
router.get("/one/:subcategoryId", subCategoryController.getSubCategoryById);

// to update the category
router.patch("/update/:categoryId", subCategoryController.updateSubCategory);

// to delete the category
router.patch("/delete/:categoryId", subCategoryController.deleteSubCategory);

// getProductBy sub-Category
router.get(
  "/products/:subcategoryId",
  subCategoryController.getProductBySubCategory
);

router.patch("/empty", subCategoryController.makeEmptySubcate);

module.exports = router;
