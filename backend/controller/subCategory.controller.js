const SUB_CATEGORY_MODEL = require("../model/subCategoryModel");
const CATEGORY_MODEL = require("../model/categoryModel");
const { priceBlocker } = require("../middleware/priceblocker");
const {
  priceRemovel,
  validatePriceFilter,
  calculationProfitPercent
} = require("../utils/productFilter");
const ERROR_RESPONSE = require("../utils/catchErrorResponse");

module.exports.addSubCategory = async (req, res) => {
  try {
    const { categoryId } = req.body;

    const category = await CATEGORY_MODEL.findById(categoryId);

    if (!category) {
      return res.status(404).json({
        status: false,
        message: "Category not found"
      });
    }

    const subCategory = await SUB_CATEGORY_MODEL.create(req.body);

    category.subCategories.push(subCategory._id);

    await category.save();

    return res.status(200).json({
      status: true,
      message: "SubCategory created successfully!",
      data: subCategory
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

// get all category
module.exports.getSubCategoriesByPriority = async (req, res) => {
  try {
    const categories = await SUB_CATEGORY_MODEL.find({ disable: false })
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

module.exports.getSubCategoryById = async (req, res) => {
  try {
    const { subcategoryId } = req.params;
    const subCategory = await CATEGORY_MODEL.findOne({
      _id: subcategoryId,
      disable: false
    }).populate({
      path: "subSubCategories",
      match: { disable: false }
    });

    if (!subCategory) {
      res.status(404).json({
        status: false,
        message: "Sub-Category not found"
      });
    }

    res.status(200).json({
      status: true,
      data: category
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

// to update the category
module.exports.updateSubCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await SUB_CATEGORY_MODEL.findByIdAndUpdate(
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
module.exports.deleteSubCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await SUB_CATEGORY_MODEL.findByIdAndDelete(categoryId);

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

module.exports.getProductBySubCategory = async (req, res) => {
  try {
    const { subcategoryId } = req.params;

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

    const products = await SUB_CATEGORY_MODEL.findById(subcategoryId).populate({
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

module.exports.makeEmptySubcate = async (req, res) => {
  try {
    const subcate = await SUB_CATEGORY_MODEL.find();

    subcate.forEach(async (elem) => {
      await SUB_CATEGORY_MODEL.findByIdAndUpdate(elem._id, {
        subSubCategories: []
      });
    });

    res.status(200).json({
      status: true,
      message: "subSubcate get empty"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};
