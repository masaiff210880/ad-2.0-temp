const express = require("express");
const router = express.Router();
const subSubCategoryController = require("../controller/subSubCategory.controller");

// add
router.post("/add", subSubCategoryController.addSubSubCategory);

//get all categories in priority wise
router.get(
  "/all-priority",
  subSubCategoryController.getSubSubCategoriesByPriority
);

// to update the category
router.patch(
  "/update/:categoryId",
  subSubCategoryController.updateSubSubCategory
);

// to delete the category
router.patch(
  "/delete/:categoryId",
  subSubCategoryController.deleteSubSubCategory
);

// getProductBy sub-Category
router.get(
  "/products/:subsubcategoryId",
  subSubCategoryController.getProductBySubSubCategory
);

module.exports = router;
