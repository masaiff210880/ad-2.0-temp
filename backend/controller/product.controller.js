const productServices = require("../services/product.service");
const PRODUCT_MODEL = require("../model/ProductModel");
const VARIANT_MODEL = require("../model/variantModel");
const { priceBlocker } = require("../middleware/priceblocker");
const {
  priceRemovel,
  validatePriceFilter,
  calculationProfitPercent
} = require("../utils/productFilter");
const ERROR_RESPONSE = require("../utils/catchErrorResponse");

// const redis = require("redis");
// const client = redis.createClient();

// client.on("error", (err) => {
//   console.error(err);
// });
// client.on('connect', () => {
//   console.log('Connected to Redis');
// });

// const ObjectId = require("mongoose").Types.ObjectId;
const { ObjectId } = require("mongodb");

module.exports.getAllProductsForUSer = async (req, res) => {
  try {
    let query = req.query || {};
    let page = parseInt(query.page) || 1;
    let limit = parseInt(query.limit) || 10;
    delete query.page;
    delete query.limit;
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
    // let priceRemove = {};

    const [products, totalProducts] = await Promise.all([
      PRODUCT_MODEL.find(query, priceRemove)
        .sort({ _id: -1 })
        .populate({
          path: "categories",
          match: { disable: false },
          select: {
            subCategories: 0,
            productsId: 0,
            updatedAt: 0,
            __v: 0
          }
        })
        .skip(skip)
        .limit(limit),
      PRODUCT_MODEL.countDocuments(query)
    ]);

    return res.status(200).json({
      success: true,
      data: products,
      isUserLogin,
      userType,
      totalProducts,
      page,
      totalPages: Math.ceil(totalProducts / limit)
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

// module.exports.addProduct = async (req, res) => {
//   try {
//     const {
//       costPrice = 0,
//       price,
//       percentTax = 0,
//       mlBasedTax = 0,
//       stateTax = 0,
//       costTax = 0,
//       sku
//     } = req.body;

//     if (!sku) {
//       res.status(400).json({
//         status: false,
//         message: "Please enter the SKU value of product"
//       });
//     }

//     const isExistProduct = await PRODUCT_MODEL.findOne({ sku });

//     if (isExistProduct) {
//       res.status(400).json({
//         status: false,
//         message: "Product already added"
//       });
//     }

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
//       message: "Product added successfully",
//       productId: product._id
//     });
//   } catch (error) {
//     return ERROR_RESPONSE(res, error);
//   }
// };

module.exports.addProduct = async (req, res) => {
  try {
    const {
      costPrice = 0,
      price,
      percentTax = 0,
      mlBasedTax = 0,
      stateTax = 0,
      costTax = 0,
      sku
    } = req.body;

    if (!sku) {
      return res.status(400).json({
        status: false,
        message: "Please enter the SKU value of the product."
      });
    }

    const isExistProduct = await PRODUCT_MODEL.findOne({ sku });

    if (isExistProduct) {
      return res.status(400).json({
        status: false,
        message: "Product already added."
      });
    }

    const priceList = Object.keys(price);

    const isValidPriceLevel = await validatePriceFilter(priceList);

    if (!isValidPriceLevel) {
      return res.status(400).json({
        status: false,
        message: "Please select the price fields as declared in .env."
      });
    }

    let profitPercentage = calculationProfitPercent(
      costPrice,
      price,
      priceList
    );

    const totalTax = percentTax + mlBasedTax + stateTax + costTax;
    req.body.totalTax = totalTax;
    req.body.profitPercent = profitPercentage;

    const product = new PRODUCT_MODEL(req.body);
    await product.save();

    return res.status(200).json({
      status: true,
      message: "Product added successfully.",
      productId: product._id
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.addAllProducts = async (req, res) => {
  try {
    const { products } = req.body; //send products in an array by put all the details

    let allProducts = await Promise.all(
      products.map(async (product) => {
        const {
          costPrice = 0,
          price,
          percentTax = 0,
          mlBasedTax = 0,
          stateTax = 0,
          costTax = 0
        } = product;

        const priceList = Object.keys(price);

        const isValidPriceLevel = await validatePriceFilter(priceList);

        if (!isValidPriceLevel) {
          return res.status(400).json({
            status: false,
            message: "Please select the price fields as declared in .env"
          });
        }

        let profitPercentage = calculationProfitPercent(
          costPrice,
          price,
          priceList
        );

        const totalTax = percentTax + mlBasedTax + stateTax + costTax;

        return {
          ...product,
          totalTax,
          profitPercent: profitPercentage
        };
      })
    );

    const insertProduct = await PRODUCT_MODEL.insertMany(allProducts);

    res.status(200).json({
      status: false,
      data: insertProduct
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

//update all products
module.exports.updateAll = async (req, res) => {
  try {
    const products = await PRODUCT_MODEL.find();

    const bulkUpdateOperations = products.map((product) => {
      const { price, costPrice } = product;
      const profitPercentage1 =
        ((price.levelOne - costPrice) / costPrice) * 100;
      const profitPercentage2 =
        ((price.levelTwo - costPrice) / costPrice) * 100;
      const profitPercentage3 =
        ((price.levelThree - costPrice) / costPrice) * 100;

      return {
        updateOne: {
          filter: { _id: product._id },
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

    await PRODUCT_MODEL.bulkWrite(bulkUpdateOperations);

    res.json({ message: "Profit percentages updated successfully" });
  } catch (error) {
    console.error("Error updating profit percentages:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

//merge with variants
// module.exports.relationShip = async (req, res) => {
//   try {
//     // Fetch all products
//     const products = await PRODUCT_MODEL.find();

//     // Loop through products and find related variants
//     for (const product of products) {
//       const variants = await VARIANT_MODEL.find({ productSku: product.sku });

//       // Update the product's variantIDs array with variant _ids
//       const variantIDs = variants.map((variant) => variant._id);

//       if (variants.length > 0) {
//         await PRODUCT_MODEL.findByIdAndUpdate(product._id, {
//           variants: variantIDs,
//           handsOnQuantity: product.stock_quantity,
//           profitPercent: variants[0].profitPercent,
//           price: variants[0].price,
//           costPrice: variants[0].costPrice,
//           minPrice: variants[0].costPrice
//         });
//       }

//       // Update each variant's productID
//       for (const variant of variants) {
//         await VARIANT_MODEL.findByIdAndUpdate(variant._id, {
//           productId: product._id
//         });
//       }
//     }

//     res.json({ message: "Relationships created successfully" });
//   } catch (error) {
//     console.error("Error creating relationships:", error);
//     res.status(500).json({ error: "An error occurred" });
//   }
// };

module.exports.relationShip = async (req, res) => {
  try {
    const variants = await PRODUCT_MODEL.find();

    variants.forEach(async (element) => {
      await PRODUCT_MODEL.findByIdAndUpdate(element._id, {
        catalog_visibility: true
      });
    });

    res.send("Hands-on quantity updated successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred.");
  }
};

module.exports.getProductsByCategoryId = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const products = await PRODUCT_MODEL.find({ categories: categoryId });

    if (!products) {
      res.status(404).json({
        status: false,
        message: "category not found"
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

// get all products for Admin
module.exports.getAllProductsForAdmin = async (req, res) => {
  try {
    let query = req.query || {};
    let page = parseInt(query.page) || 1;
    let limit = parseInt(query.limit) || 10;
    delete query.page;
    delete query.limit;
    query.isDeleted = false;
    let skip = (page - 1) * limit;

    const [products, totalProducts] = await Promise.all([
      PRODUCT_MODEL.find(query)
        .sort({ _id: -1 })
        .populate({
          path: "categories",
          match: { disable: false },
          select: {
            subCategories: 0,
            productsId: 0,
            updatedAt: 0,
            __v: 0
          }
        })
        .skip(skip)
        .limit(limit),
      PRODUCT_MODEL.countDocuments(query)
    ]);

    return res.status(200).json({
      success: true,
      data: products,
      totalProducts,
      page,
      totalPages: Math.ceil(totalProducts / limit)
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

// module.exports.getAllProductsForAdmin = async (req, res) => {
//   try {
//     const product = await PRODUCT_MODEL.find();

//     res.status(200).json({
//       status: true,
//       product
//     });
//   } catch (error) {
//     return ERROR_RESPONSE(res, error);
//   }
// };

module.exports.searchProductsByLetter = async (req, res) => {
  try {
    const searchLetter = req.params.letter?.toLowerCase();

    if (!searchLetter) {
      return res.status(400).json({
        status: false,
        message: "Please provide a search input."
      });
    }

    let query = { ...req.query };
    let page = parseInt(query.page) || 1;
    let limit = parseInt(query.limit) || 10;
    delete query.page;
    delete query.limit;
    query.name = { $regex: searchLetter, $options: "i" };
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

    const products = await PRODUCT_MODEL.find(query, priceRemove)
      .populate("categories")
      .skip(skip)
      .limit(limit);

    if (products.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No matching products found."
      });
    }

    const totalProducts = await PRODUCT_MODEL.countDocuments(query);

    return res.status(200).json({
      status: true,
      datasa: products,
      isUserLogin,
      userType,
      totalProducts,
      page,
      totalPages: Math.ceil(totalProducts / limit)
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

// module.exports.globalSearchProducts = async (req, res) => {
//   try {
//     const searchInput = req.params.input?.toLowerCase(); // Get the search Letter from the URL parameter

//     if (!searchInput || searchInput.length < 3) {
//       return res.status(400).json({
//         status: false,
//         message: "Please search atleast 3 or more letter."
//       });
//     }

//     let query = { ...req.query };
//     let page = parseInt(query.page) || 1;
//     let limit = parseInt(query.limit) || 10;
//     delete query.page;
//     delete query.limit;
//     query.$or = [
//       { name: { $regex: searchInput, $options: "i" } },
//       { sku: { $regex: searchInput, $options: "i" } },
//       { slug: { $regex: searchInput, $options: "i" } }
//       // Add other fields we want to search here...
//     ];
//     query.disable = false;
//     query.isStock = true;
//     query.isDeleted = false;
//     let skip = (page - 1) * limit;

//     let loginResponse = await priceBlocker(req, res);
//     let isUserLogin = loginResponse.isLogin || false;

//     let userType = null;

//     if (isUserLogin) {
//       const { user } = req.body;
//       userType = user.userType;
//     }

//     let priceRemove = await priceRemovel(
//       isUserLogin,
//       userType,
//       loginResponse.role
//     );

//     const products = await PRODUCT_MODEL.find(query, priceRemove)
//       // .sort({ _id: -1 })
//       .populate({
//         path: "categories",
//         match: { disable: false },
//         select: {
//           subCategories: 0,
//           productsId: 0,
//           updatedAt: 0,
//           __v: 0
//         }
//       })
//       .skip(skip)
//       .limit(limit);

//     if (products.length === 0) {
//       return res.status(404).json({
//         status: false,
//         message: "No matching products found."
//       });
//     }

//     const totalProducts = await PRODUCT_MODEL.countDocuments(query);

//     return res.status(200).json({
//       status: true,
//       data: products,
//       isUserLogin,
//       userType,
//       totalProducts,
//       page,
//       totalPages: Math.ceil(totalProducts / limit)
//     });
//   } catch (error) {
//     return ERROR_RESPONSE(res, error);
//   }
// };

module.exports.globalSearchProducts = async (req, res) => {
  try {
    const searchInput = req.params.input?.toLowerCase(); // Get the search Letter from the URL parameter

    if (!searchInput || searchInput.length < 3) {
      return res.status(400).json({
        status: false,
        message: "Please search at least 3 or more letters."
      });
    }

    let query = { ...req.query };
    let page = parseInt(query.page) || 1;
    let limit = parseInt(query.limit) || 10;
    delete query.page;
    delete query.limit;
    query.$or = [
      { name: { $regex: searchInput, $options: "i" } },
      { sku: { $regex: searchInput, $options: "i" } },
      { slug: { $regex: searchInput, $options: "i" } }
      // Add other fields we want to search here...
    ];
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

    const products = await PRODUCT_MODEL.find(query, priceRemove)
      .populate({
        path: "categories",
        match: { disable: false },
        select: {
          subCategories: 0,
          productsId: 0,
          updatedAt: 0,
          __v: 0
        }
      })
      .skip(skip)
      .limit(limit);

    if (products.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No matching products found."
      });
    }

    // Custom sorting based on the index of the search input in the product name
    products.sort((a, b) => {
      const aNameIndex = a.name.toLowerCase().indexOf(searchInput);
      const bNameIndex = b.name.toLowerCase().indexOf(searchInput);

      if (aNameIndex === -1 && bNameIndex !== -1) {
        return 1;
      } else if (aNameIndex !== -1 && bNameIndex === -1) {
        return -1;
      } else {
        return aNameIndex - bNameIndex;
      }
    });

    const totalProducts = await PRODUCT_MODEL.countDocuments(query);

    return res.status(200).json({
      status: true,
      data: products,
      isUserLogin,
      userType,
      totalProducts,
      page,
      totalPages: Math.ceil(totalProducts / limit)
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.topSellingProduct = async (req, res) => {
  try {
    const { limit = 7 } = req.query;

    const topSellingProductCursor = PRODUCT_MODEL.find(
      {},
      {
        name: 1,
        featuredImage: 1,
        total_sales: 1,
        sku: 1
      }
    ).sort({
      total_sales: -1
    });

    topSellingProductCursor.limit(Number(limit));

    const topSellingProduct = await topSellingProductCursor.exec();

    res.status(200).json({
      status: true,
      data: topSellingProduct
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

//get one particular product with all allVariants
module.exports.getOneProduct = async (req, res) => {
  try {
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

    const products = await PRODUCT_MODEL.findOne(
      { _id: req.params.id, disable: false, isStock: true, isDeleted: false },
      priceRemove
    )
      .populate({
        path: "variants",
        match: { disable: false, isStock: true, isDeleted: false },
        select: priceRemove
      })
      .populate({
        path: "categories",
        match: { disable: false },
        select: { categoryName: 1, categoryLogo: 1, priority: 1 }
      });

    if (!products) {
      return res.status(404).json({
        status: false,
        message: "Product not found"
      });
    }

    return res.status(200).json({
      status: true,
      data: products,
      isUserLogin,
      userType
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const [deletedProduct] = await Promise.all([
      PRODUCT_MODEL.findByIdAndUpdate(productId, {
        $set: { isDeleted: true }
      }),
      VARIANT_MODEL.updateMany({ productId }, { $set: { isDeleted: true } })
    ]);

    if (!deletedProduct) {
      return res.status(404).json({
        status: false,
        message: "Product not found"
      });
    }

    return res.status(200).json({
      status: true,
      message: "Product deleted successfully"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.deleteMultipleProducts = async (req, res) => {
  try {
    const { productIds } = req.body; // Send all product IDs in an array that will be deleted

    const deleteOperations = productIds.map(async (productId) => {
      await PRODUCT_MODEL.findByIdAndUpdate(productId, {
        $set: { isDeleted: true }
      });

      await VARIANT_MODEL.updateMany(
        { productId },
        { $set: { isDeleted: true } }
      );
    });

    await Promise.all(deleteOperations);

    res.status(200).json({
      status: true,
      message: "All products deleted successfully"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { costPrice, price } = req.body; //send all the price with changes
    //send categories and galleryImage updated array, after remove or add data.

    const product = await PRODUCT_MODEL.findById(productId);

    if (!product) {
      return res.status(404).json({
        status: false,
        message: "Product not found"
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

    let updatedProduct = await PRODUCT_MODEL.findByIdAndUpdate(
      productId,
      req.body
    );

    await product.save();

    res.status(200).json({
      status: true,
      message: "Product Updated",
      data: updatedProduct
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

//get categories list of product
module.exports.allProductlist = async (req, res) => {
  try {
    const { type } = req.params;
    const categories = await PRODUCT_MODEL.distinct(type); // Get list of all value - just pass the field name in params
    res.status(200).json(categories);
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.getAllDisableProducts = async (req, res) => {
  try {
    let query = req.query || {};
    query.disable = false;

    const products = await PRODUCT_MODEL.find(query);

    res.status(200).json({
      status: true,
      data: products
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.getAllTrashProducts = async (req, res) => {
  try {
    let query = req.query || {};
    query.isDeleted = true;

    const products = await PRODUCT_MODEL.find(query);

    res.status(200).json({
      status: true,
      data: products
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.getAllProductsWithoutFilter = async (req, res) => {
  try {
    let query = req.query || {};
    let page = parseInt(query.page) || 1;
    let limit = parseInt(query.limit) || 10;
    delete query.page;
    delete query.limit;

    const skip = (page - 1) * limit;

    const [products, totalProducts] = await Promise.all([
      PRODUCT_MODEL.find(query).populate("categories").skip(skip).limit(limit),
      PRODUCT_MODEL.countDocuments(query)
    ]);

    if (!products) {
      return res.status(404).json({
        status: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      status: true,
      data: products,
      totalProducts,
      page,
      totalPages: Math.ceil(totalProducts / limit)
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.getOneProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await PRODUCT_MODEL.findById(id).populate("variants");

    if (!products) {
      return res.status(404).json({
        status: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      status: true,
      products
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

// module.exports.getOneProductById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const cacheKey = `product:${id}`;
//     let isCache = false;

//     // Check if the product data is in the cache
//     client.get(cacheKey, async (err, data) => {
//       if (err) {
//         console.error(err);
//         return ERROR_RESPONSE(res, "Error retrieving data from cache");
//       }

//       if (data !== null) {
//         // Data found in cache, parse it and send as the API response
//         const parsedData = JSON.parse(data);
//         isCache = true;
//         return res.status(200).json({
//           status: true,
//           product: parsedData,
//           isCache
//         });
//       }

//       // If data is not in cache, proceed with fetching from the database
//       const product = await PRODUCT_MODEL.findById(id).populate("variants");

//       if (!product) {
//         return res.status(404).json({
//           status: false,
//           message: "Product not found"
//         });
//       }

//       // Store the fetched product data in the cache with an expiration time
//       const cacheExpiration = 3600; // 1 hour (in seconds)
//       client.setex(
//         cacheKey,
//         cacheExpiration,
//         JSON.stringify(product),
//         (cacheErr) => {
//           if (cacheErr) {
//             console.error(cacheErr);
//           }
//         }
//       );

//       // Return the fetched product data as the API response
//       return res.status(200).json({
//         status: true,
//         product,
//         isCache
//       });
//     });
//   } catch (error) {
//     return ERROR_RESPONSE(res, error);
//   }
// };

// module.exports = {
//   getOneProductById,
// };

// Route for deleting a single gallery image from an array
module.exports.deleteOneGalleryImage = async (req, res) => {
  try {
    const { productId } = req.params;
    const { imageUrl } = req.body;

    const product = await PRODUCT_MODEL.findById(productId);

    if (!product) {
      return res.status(404).json({
        status: false,
        message: "Product not found"
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

    product.galleryImage.splice(imageIndex, 1);

    await product.save();

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
    const { productId } = req.params;

    const product = await PRODUCT_MODEL.findById(productId);

    if (!product) {
      return res.status(404).json({
        status: false,
        message: "Product not found"
      });
    }

    product.galleryImage = [];

    await product.save();

    res.status(200).json({
      status: true,
      message: "All images deleted successfully"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.getVendorDataForOneProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const vendorData = await PRODUCT_MODEL.findOne(
      { _id: productId },
      {
        vendors: 1,
      }
    )
      .populate({
        path: "vendors.vendorId",
        select: {
          vendorUniqueId: 1,
          firstName: 1,
          lastName: 1,
          companyName: 1
        }
      })
      .lean(); // Convert the result to a plain JavaScript object for performance

    if (!vendorData) {
      return res.status(404).json({
        status: false,
        message: "No vendor found for this product"
      });
    }

    res.status(200).json({
      status: true,
      data: vendorData
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};


// module.exports.getVendorDataForOneProduct = async (req, res) => {
//   try {
//     const { productId } = req.params;

//     const vendorData = await PRODUCT_MODEL.findById(productId, {
//       costPrice: 1,
//       vendors: 1
//     }).populate({
//       path: "vendors.$vendorId",
//       select: {
//         vendorUniqueId: 1,
//         firstName: 1,
//         lastName: 1,
//         companyName: 1
//       }
//     });

//     if (vendorData.length === 0 || !vendorData) {
//       res.status(404).json({
//         status: false,
//         message: "No vendor found for this product"
//       });
//     }

//     res.status(200).json({
//       status: true,
//       data: vendorData
//     });
//   } catch (error) {
//     return ERROR_RESPONSE(res, error);
//   }
// };

// ==========================================================================================

// get all products by type
module.exports.getProductsByType = async (req, res) => {
  try {
    const result = await productServices.getProductTypeService(req);
    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

// get offer product controller
module.exports.getOfferTimerProducts = async (req, res) => {
  try {
    const result = await productServices.getOfferTimerProductService(
      req.query.type
    );
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

// get Popular Product By Type
module.exports.getPopularProductByType = async (req, res) => {
  try {
    const result = await productServices.getPopularProductServiceByType(
      req.params.type
    );
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

// get top rated Products
module.exports.getTopRatedProducts = async (req, res) => {
  try {
    const result = await productServices.getTopRatedProductService();
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

// getSingleProduct
exports.getSingleProduct = async (req, res) => {
  try {
    const product = await productServices.getProductService(req.params.id);
    res.json(product);
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

// get Related Product
exports.getRelatedProducts = async (req, res) => {
  try {
    const products = await productServices.getRelatedProductService(
      req.params.id
    );
    res.status(200).json({
      status: true,
      data: products
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

exports.emptyTheCategory = async (req, res) => {
  try {
    const product = await PRODUCT_MODEL.find();

    for (elem of product) {
      await PRODUCT_MODEL.findByIdAndUpdate(elem._id, { categories: [] });
    }

    res.send("product category empty");
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

exports.addFieldsToEachProduct = async (req, res) => {
  try {
    const allProducts = await PRODUCT_MODEL.find();

    for (let elem of allProducts) {
      await PRODUCT_MODEL.findByIdAndUpdate(elem._id, req.body);
    }
    // await PRODUCT_MODEL.updateMany(req.body);

    res.send("Add fields in products");
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};
