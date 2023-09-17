const CATEGORY_MODEL = require("../model/categoryModel");
const PRODUCT_MODEL = require("../model/ProductModel");
const SUB_CATEGORY_MODEL = require("../model/subCategoryModel");
const SUB_SUB_CATEGORY_MODEL = require("../model/subSubCategoryModel");
const { priceBlocker } = require("../middleware/priceblocker");
const {
  priceRemovel,
  validatePriceFilter,
  calculationProfitPercent
} = require("../utils/productFilter");
const ERROR_RESPONSE = require("../utils/catchErrorResponse");

// add category
module.exports.addCategory = async (req, res) => {
  try {
    const category = await CATEGORY_MODEL.create(req.body);

    res.status(200).json({
      status: true,
      message: "Category created statusfully!",
      data: category
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

// get all category
module.exports.getCategoriesByPriority = async (req, res) => {
  try {
    const categories = await CATEGORY_MODEL.find({ disable: false })
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

// get one category by ID
module.exports.getCategoryById = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await CATEGORY_MODEL.findOne({
      _id: categoryId,
      disable: false
    }).populate({
      path: "subCategories",
      match: { disable: false }
    });

    if (!category) {
      res.status(404).json({
        status: false,
        message: "Category not found"
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
module.exports.updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await CATEGORY_MODEL.findByIdAndUpdate(
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
module.exports.deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await CATEGORY_MODEL.findByIdAndDelete(categoryId);

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

module.exports.getProductByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

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

    const products = await CATEGORY_MODEL.findById(categoryId).populate({
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

module.exports.insertManyCategory = async (req, res) => {
  try {
    let { data } = req.body;

    for (elem of data) {
      await CATEGORY_MODEL.create({ categoryName: elem, slug: elem });
    }

    res.send({ message: "all category puted" });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.makeCateProRelation = async (req, res) => {
  try {
    // const { data } = req.body;
    const data = [];

    const promises = data.map(async (elem) => {
      const product = await PRODUCT_MODEL.findOne({ sku: elem.sku });
      const category = await CATEGORY_MODEL.findOne({
        categoryName: elem.categories
      });

      if (product && category) {
        product.categories.push(category._id);
        category.productsId.push(product._id);
        await Promise.all([product.save(), category.save()]);
      }
    });

    await Promise.all(promises);

    res.status(200).json({
      status: true,
      message: "makeCateProRelation"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.makeSubCateProRelation = async (req, res) => {
  try {
    const data = [];

    const promises = data.map(async (elem) => {
      const product = await PRODUCT_MODEL.findOne({ sku: elem.sku });
      const category = await SUB_SUB_CATEGORY_MODEL.findOne({
        subSubCategoryName: elem.categories
      });

      if (product && category) {
        product.subSubCategories.push(category._id);
        category.productsId.push(product._id);
        await Promise.all([product.save(), category.save()]);
      }
    });

    await Promise.all(promises);

    res.status(200).json({
      status: true,
      message: "makeSubCateProRelation"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

module.exports.makeCateSubcateRelation = async (req, res) => {
  try {
    const categories = [];

    const subcategories = [];

    await asyncForEach(categories, async (category) => {
      const matchingSubcategories = subcategories.filter(
        (subcategory) => subcategory.sku === category.sku
      );

      if (matchingSubcategories.length > 0) {
        const categoryDocument = await CATEGORY_MODEL.findOne({
          categoryName: category.categories
        });

        const subcategoryIds = await Promise.all(
          matchingSubcategories.map(async (subcat) => {
            const subcategoryDocument = await SUB_CATEGORY_MODEL.findOne({
              subCategoryName: subcat.categories
            });
            return subcategoryDocument._id;
          })
        );

        categoryDocument.subCategories.push(...subcategoryIds);
        await categoryDocument.save();
      }
    });

    res.status(200).json({
      message: "Category-subcategory relations updated successfully."
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.makesubCateSubSubcateRelation = async (req, res) => {
  try {
    const cubCate = []; // Replace with sub category data
    const subSubCate = []; // Replace with actual data

    for (const elem of cubCate) {
      await asyncForEach(subSubCate, async (subSubElem) => {
        if (elem.sku === subSubElem.sku) {
          const subCategori = await SUB_CATEGORY_MODEL.findOne({
            subCategoryName: elem.categories
          });

          const subSubCategori = await SUB_SUB_CATEGORY_MODEL.findOne({
            subSubCategoryName: subSubElem.categories
          });

          if (subCategori && subSubCategori) {
            subCategori.subSubCategories.push(subSubCategori._id);
            await subCategori.save();
          }
        }
      });
    }

    res.status(200).json({
      message: "SubCategory-subSubCategory relations updated successfully."
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.makeUniqueInArray = async (req, res) => {
  try {
    const categories = await CATEGORY_MODEL.find();

    const updatePromises = categories.map(async (category) => {
      const subCategoryIds = new Set(); // Set to store unique subCategory ObjectId values
      const newSubCategories = [];

      for (const subCategoryId of category.subCategories) {
        if (!subCategoryIds.has(subCategoryId.toString())) {
          subCategoryIds.add(subCategoryId.toString());
          newSubCategories.push(subCategoryId);
        }
      }

      await CATEGORY_MODEL.findByIdAndUpdate(category._id, {
        subCategories: newSubCategories
      });
    });

    await Promise.all(updatePromises);

    res.status(200).json({
      status: true,
      message: "Categories made unique"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};
