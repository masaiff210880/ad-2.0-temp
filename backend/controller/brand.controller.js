const brandService = require("../services/brand.service");
const ERROR_RESPONSE = require("../utils/catchErrorResponse");
// add a brand
exports.addBrand = async (req, res) => {
  try {
    const result = await brandService.addBrandService(req.body);
    res.status(200).json({
      status: true,
      message: "Brand created successfully!",
      data: result
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

// add all Brand
exports.addAllBrand = async (req, res) => {
  try {
    const result = await brandService.addAllBrandService(req.body);
    res.json({
      message: "Brands added successfully",
      result
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

// get active Brand
exports.getActiveBrands = async (req, res) => {
  try {
    const result = await brandService.getBrandsService();
    res.status(200).json({
      success: true,
      result
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};
