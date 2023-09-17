const express = require("express");
const router = express.Router();
const categoryController = require("../controller/category.controller");

// add
router.post("/add", categoryController.addCategory);

//get all categories in priority wise
router.get("/all-priority", categoryController.getCategoriesByPriority);

//get one category by id
router.get("/one/:categoryId", categoryController.getCategoryById);

// to update the category
router.patch("/update/:categoryId", categoryController.updateCategory);

// to delete the category
router.delete("/delete/:categoryId", categoryController.deleteCategory);

// getProductByCategory
router.get("/products/:categoryId", categoryController.getProductByCategory);

// ======================================================================================= 

//make category product relation
router.get("/catepro", categoryController.makeCateProRelation);

//make sub-category product relation
router.get("/subcatepro", categoryController.makeSubCateProRelation);

//make makeCateSubcateRelation relation
router.get("/catesubcate", categoryController.makeCateSubcateRelation);

//make makesubCateSubSubcateRelation relation
router.get(
  "/subcatesubsubcate",
  categoryController.makesubCateSubSubcateRelation
);
router.get("/unique", categoryController.makeUniqueInArray);

router.post("/many", categoryController.insertManyCategory);

module.exports = router;
