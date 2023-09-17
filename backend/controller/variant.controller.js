const VARIANT_MODEL = require("../model/variantModel");
const PRODUCT_MODEL = require("../model/ProductModel");
const { priceBlocker } = require("../middleware/priceblocker");
const {
  priceRemovel,
  validatePriceFilter,
  calculationProfitPercent
} = require("../utils/productFilter");
const ERROR_RESPONSE = require("../utils/catchErrorResponse");

module.exports.addVariants = async (req, res) => {
  try {
    const { productId } = req.params;
    const { variants } = req.body;

    const product = await PRODUCT_MODEL.findById(productId);

    if (!product) {
      return res.status(404).json({
        status: false,
        message: "Product not found"
      });
    }

    const allVariants = await Promise.all(
      variants.map(async (elem) => {
        let price = elem.price;
        let costPrice = elem.costPrice;

        const priceList = Object.keys(price);

        const isValidPriceLevel = await validatePriceFilter(priceList);

        if (!isValidPriceLevel) {
          return res.status(400).json({
            status: false,
            message: "Please select the price fields as declared in .env"
          });
        }

        let profitPercent = await calculationProfitPercent(
          costPrice,
          price,
          priceList
        );

        return {
          ...elem,
          productId,
          profitPercent
        };
      })
    );

    const variant = await VARIANT_MODEL.insertMany(allVariants);

    for (const product of variant) {
      await PRODUCT_MODEL.findByIdAndUpdate(productId, {
        $push: { variants: product._id }
      });
    }

    res.status(200).json({
      status: true,
      message: "Variants added to the product",
      data: variant
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.updateVariant = async (req, res) => {
  try {
    const { variantId, costPrice, price } = req.body;

    const variantProduct = await VARIANT_MODEL.findById(variantId);

    if (!variantProduct) {
      return res.status(404).json({
        status: false,
        message: "Product Variant not found"
      });
    }

    if (price) {
      const priceList = Object.keys(price);

      const isValidPriceLevel = await validatePriceFilter(priceList);

      if (!isValidPriceLevel) {
        return res.status(400).json({
          status: false,
          message: "Please select the price fields as declared in .env"
        });
      }

      let cp = costPrice ? costPrice : variantProduct.costPrice;

      let profitPercentage = await calculationProfitPercent(
        cp,
        price,
        priceList
      );

      req.body.profitPercent = profitPercentage;
    }

    await VARIANT_MODEL.findByIdAndUpdate(variantId, req.body);

    res.status(200).json({
      status: true,
      message: "Product variant updated successfully"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.updateAll = async (req, res) => {
  try {
    const variants = await VARIANT_MODEL.find();

    const bulkUpdateOperations = variants.map((variant) => {
      const { price, costPrice } = variant;
      const profitPercentage1 =
        ((price.levelOne - costPrice) / costPrice) * 100;
      const profitPercentage2 =
        ((price.levelTwo - costPrice) / costPrice) * 100;
      const profitPercentage3 =
        ((price.levelThree - costPrice) / costPrice) * 100;

      return {
        updateOne: {
          filter: { _id: variant._id },
          update: {
            $set: {
              profitPercent: {
                levelOne: profitPercentage1,
                levelTwo: profitPercentage2,
                levelThree: profitPercentage3
              }
            }
          }
        }
      };
    });

    await VARIANT_MODEL.bulkWrite(bulkUpdateOperations);

    res.json({ message: "Profit percentages updated successfully" });
  } catch (error) {
    console.error("Error updating profit percentages:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports.deleteVariantProduct = async (req, res) => {
  try {
    await VARIANT_MODEL.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: true,
      message: "Product Variant deleted successfully"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.getAllVariants = async (req, res) => {
  try {
    let query = req.query || {};
    let page = parseInt(query.page) || 1;
    let limit = parseInt(query.limit) || 10;
    query.disable = false;
    query.isStock = true;
    query.isDeleted = false;
    let skip = (page - 1) * limit;

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

    const [variant, totalVariants] = await Promise.all([
      VARIANT_MODEL.find(query, priceRemove).skip(skip).limit(limit),
      VARIANT_MODEL.countDocuments(query)
    ]);

    if (!variant) {
      return res.status(404).json({
        status: false,
        message: "Item not found"
      });
    }

    res.status(200).json({
      status: true,
      data: variant,
      isUserLogin,
      userType,
      totalVariants,
      page,
      totalPages: Math.ceil(totalVariants / limit)
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.getOneVariant = async (req, res) => {
  try {
    const { variantId } = req.params;

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

    const variant = await VARIANT_MODEL.findOne(
      {
        _id: variantId,
        disable: false,
        isStock: true,
        isDeleted: false
      },
      priceRemove
    ).populate({
      path: "productId",
      match: { disable: false, isStock: true, isDeleted: false },
      select: priceRemove
    });

    if (!variant) {
      return res.status(404).json({
        status: false,
        message: "Item not found"
      });
    }

    res.status(200).json({
      status: true,
      data: variant
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};
