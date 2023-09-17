const COMMENT_MODEL = require("../model/poCommentModel");
const PURCHASE_ORDER_MODEL = require("../model/purchaseOrderModel");
const ERROR_RESPONSE = require("../utils/catchErrorResponse");

module.exports.doComment = async (req, res) => {
  try {
    const { poId } = req.params;

    const po = await PURCHASE_ORDER_MODEL.findById(poId);

    if (!po) {
      return res.status(404).json({
        status: false,
        message: "Purchase order not found"
      });
    }

    const { user, comment } = req.body;
    const { userName, userId } = user;

    const createComment = new COMMENT_MODEL({
      commentedBy: userId,
      commentedByName: userName,
      poId,
      comment
    });

    await createComment.save();

    res.status(200).json({
      status: true,
      message: "Commented"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.getAllComments = async (req, res) => {
  try {
    const { poId } = req.params;

    const comments = await COMMENT_MODEL.find({ poId });

    if (!comments) {
      return res.status(404).json({
        status: false,
        message: "Comments not found for this Order"
      });
    }

    res.status(200).json({
      status: true,
      data: comments
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};
