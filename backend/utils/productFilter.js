const USER_AND_PRICE_LEVEL_MODEL = require("../model/priceLevelModel");

//remove again search weather save in cookie or cache.
module.exports.priceRemovel = async (isUserLogin, userType, role = "user") => {
  let commonFilter = {
    name: 1,
    disable: 1,
    featuredImage: 1,
    galleryImage: 1,
    productUPC: 1,
    sku: 1,
    categories: 1
  };

  if (isUserLogin) {
    if (role.toLowerCase() === "user") {
      commonFilter = {
        name: 1,
        disable: 1,
        featured: 1,
        status: 1,
        tags: 1,
        brand: 1,
        shipping_taxable: 1,
        featured: 1,
        createdDate: 1,
        readabilityScore: 1,
        seoTitle: 1,
        metaDesc: 1,
        keyPhrase: 1,
        outgoingInterLinks: 1,
        slug: 1,
        unit: 1,
        permalink: 1,
        featuredImage: 1,
        galleryImage: 1,
        productUPC: 1,
        type: 1,
        flavour: 1,
        barcode: 1,
        description: 1,
        short_description: 1,
        sku: 1,
        dimensions: 1,
        stock_status: 1,
        stock_quantity: 1,
        productId: 1,
        weight: 1,
        purchase_note: 1,
        categories: 1,
        attributes: 1
      };

      // let level = await USER_AND_PRICE_LEVEL_MODEL.find();

      let level = [
        {
          userType: ["silver", "gold", "platinum"],
          priceLevel: ["levelOne", "levelTwo", "levelThree"]
        }
      ];

      let definedUserType = level[0].userType;
      let priceLevel = level[0].priceLevel;

      let type = userType.toString().toLowerCase();

      let i = isUserLogin ? definedUserType.indexOf(type) : -1;
      // Add the appropriate price level field to the commonFilter
      if (i >= 0) {
        commonFilter[`price.${priceLevel[i]}`] = 1;
      }
    } else {
      commonFilter = {};
    }
  }

  return commonFilter;
};

module.exports.validatePriceFilter = async (priceList) => {
  let level = await USER_AND_PRICE_LEVEL_MODEL.find();

  let priceLevel = level[0].priceLevel;

  const isValidPrice = priceLevel.every((level) => priceList.includes(level));

  return isValidPrice;
};

module.exports.calculationProfitPercent = async (
  costPrice = 0,
  price,
  priceList
) => {
  let percent = priceList.reduce((acc, level) => {
    acc[level] = ((price[level] - costPrice) / price[level]) * 100;
    return acc;
  }, {});

  return percent;
};

module.exports.findPriceByUserType = async (userType) => {
  let level = await USER_AND_PRICE_LEVEL_MODEL.find();

  let definedUserType = level[0].userType;
  let priceLevel = level[0].priceLevel;

  let type = userType.toString().toLowerCase();

  let i = definedUserType.indexOf(type);

  return priceLevel[i];
};
