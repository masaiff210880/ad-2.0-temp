const DRAFT_MODEL = require("../model/draftModel");
const ERROR_RESPONSE = require("../utils/catchErrorResponse");

module.exports.addToDraft = async (req, res) => {
  try {
    const draft = new DRAFT_MODEL(req.body);
    await draft.save();

    return res.status(200).json({
      status: true,
      message: "Draft saved successfully"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

//get all particular draft
module.exports.getAllDrafts = async (req, res) => {
  try {
    const draftItem = await DRAFT_MODEL.find().sort({ _id: -1 }).exec();

    res.status(200).json({
      status: true,
      data: draftItem
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

//get one particular draft
module.exports.getOneDraft = async (req, res) => {
  try {
    const { draftId } = req.params;
    const draftItem = await DRAFT_MODEL.findById(draftId);

    res.status(200).json({
      status: true,
      data: draftItem
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.deleteDraft = async (req, res) => {
  try {
    const { draftId } = req.params;

    const deletedDraft = await DRAFT_MODEL.findByIdAndDelete(draftId);

    if (!deletedDraft) {
      return res.status(404).json({
        status: false,
        message: "Draft not found"
      });
    }

    return res.status(200).json({
      status: true,
      message: "Draft deleted successfully"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.updateDraft = async (req, res) => {
  try {
    const { draftId } = req.params;
    const { costPrice, price } = req.body; //send all the price with changes
    //send categories and galleryImage updated array, after remove or add data.

    const draft = await DRAFT_MODEL.findById(draftId);

    if (!draft) {
      return res.status(404).json({
        status: false,
        message: "Draft not found"
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

      let cp = costPrice ? costPrice : product.costPrice;

      let profitPercentage = calculationProfitPercent(cp, price, priceList);

      req.body.profitPercent = profitPercentage;
    }

    let updatedDraft = await DRAFT_MODEL.findByIdAndUpdate(draftId, req.body);

    await updatedDraft.save();

    if (!updatedDraft) {
      return res.status(404).json({
        status: false,
        message: "Draft not found"
      });
    }

    return res.status(200).json({
      status: true,
      message: "Draft updated successfully"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.deleteOneGalleryImage = async (req, res) => {
  try {
    const { draftId } = req.params;
    const { imageUrl } = req.body;

    const draft = await DRAFT_MODEL.findById(draftId);

    if (!draft) {
      return res.status(404).json({
        status: false,
        message: "Draft not found"
      });
    }

    const imageIndex = product.galleryImage.findIndex(
      (image) => image.src.toString() === imageUrl.toString()
    );

    if (imageIndex === -1) {
      return res.status(404).json({
        status: false,
        message: "Image not found"
      });
    }

    draft.galleryImage.splice(imageIndex, 1);

    await draft.save();

    res.status(200).json({
      status: true,
      message: "Image deleted successfully"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

// Route for deleting all gallery images
module.exports.deleteAllGalleryImage = async (req, res) => {
  try {
    const { draftId } = req.params;

    const draft = await DRAFT_MODEL.findById(draftId);

    if (!draft) {
      return res.status(404).json({
        status: false,
        message: "Draft not found"
      });
    }

    draft.galleryImage = [];

    await draft.save();

    res.status(200).json({
      status: true,
      message: "All images deleted successfully"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

//transfer draft to product
// module.exports.transfer = async (req, res) => {
//   try {
//     const { draftId } = req.params;

//     const draftItem = await DRAFT_MODEL.findById(draftId);

//     const {
//       costPrice = 0,
//       price,
//       percentTax = 0,
//       mlBasedTax = 0,
//       stateTax = 0,
//       costTax = 0
//     } = draftItem;

//     const priceList = Object.keys(price);

//     const isValidPriceLevel = await validatePriceFilter(priceList);

//     if (!isValidPriceLevel) {
//       return res.status(400).json({
//         status: false,
//         message: "Please select the price fields as declared in .env"
//       });
//     }

//     let profitPercentage = calculationProfitPercent(
//       costPrice,
//       price,
//       priceList
//     );

//     const totalTax = percentTax + mlBasedTax + stateTax + costTax;
//     req.body.totalTax = totalTax;
//     req.body.profitPercent = profitPercentage;

//     const product = new PRODUCT_MODEL(req.body);
//     await product.save();

//     return res.status(200).json({
//       status: true,
//       message: "Product added successfully"
//     });
//   } catch (error) {
//     return ERROR_RESPONSE(res, error);
//   }
// };
