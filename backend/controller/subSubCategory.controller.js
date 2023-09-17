const SUB_SUB_CATEGORY_MODEL = require("../model/subSubCategoryModel");
const SUB_CATEGORY_MODEL = require("../model/subSubCategoryModel");
const { priceBlocker } = require("../middleware/priceblocker");
const {
  priceRemovel,
  validatePriceFilter,
  calculationProfitPercent
} = require("../utils/productFilter");
const ERROR_RESPONSE = require("../utils/catchErrorResponse");

// add category
module.exports.addSubSubCategory = async (req, res) => {
  try {
    const { subCategoryId } = req.body;

    const isSubCategory = await SUB_CATEGORY_MODEL.findById(subCategoryId);
    if (!isSubCategory) {
      return res.status(404).json({
        status: false,
        message: "Sub category not found"
      });
    }

    const subSubCategory = await SUB_SUB_CATEGORY_MODEL.create(req.body);

    isSubCategory.subSubCategories.push(subSubCategory._id);

    await isSubCategory.save();

    return res.status(200).json({
      status: true,
      message: "Sub Sub Category created successfully!",
      data: subSubCategory
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

// get all category
module.exports.getSubSubCategoriesByPriority = async (req, res) => {
  try {
    const categories = await SUB_SUB_CATEGORY_MODEL.find({ disable: false })
      .sort({ priority: -1 })
      .exec();

    res.status(200).json({
      status: true,
      data: categories
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

// to update the category
module.exports.updateSubSubCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await SUB_SUB_CATEGORY_MODEL.findByIdAndUpdate(
      categoryId,
      req.body
    );

    if (!category) {
      return res.status(404).json({
        status: false,
        message: "Category not found"
      });
    }

    res.status(200).json({
      status: true,
      message: "Category updated",
      data: category
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

// to delete the category
module.exports.deleteSubSubCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await SUB_SUB_CATEGORY_MODEL.findByIdAndDelete(categoryId);

    if (!category) {
      return res.status(404).json({
        status: false,
        message: "Category not found"
      });
    }

    res.status(200).json({
      status: true,
      message: "Category deleted",
      data: category
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.getProductBySubSubCategory = async (req, res) => {
  try {
    const { subsubcategoryId } = req.params;

    let loginResponse = await priceBlocker(req, res);
    let isUserLogin = loginResponse.isLogin || false;

    let userType = null;

    if (isUserLogin) {
      const { user } = req.body;
      userType = user.userType;
    }

    let priceRemove = await priceRemovel(
      isUserLogin,
      userType,
      loginResponse.role
    );

    const products = await SUB_SUB_CATEGORY_MODEL.findById(
      subsubcategoryId
    ).populate({
      path: "productsId",
      match: { disable: false, isStock: true, isDeleted: false },
      select: priceRemove
    });

    if (!products) {
      return res.status(404).json({
        status: false,
        message: "Category not found"
      });
    }

    res.status(200).json({
      status: true,
      data: products
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};
