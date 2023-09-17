const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const productsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please enter the product name"]
    },
    slug: {
      type: String,
      trim: true
      // required: [true, "Please enter the slug of product"]
    },
    unit: {
      type: String,
      trim: true
    },
    // permalink: {
    //   type: String,
    //   trim: true
    //   // required: [true, "Please insert the permalink of product"]
    // },
    featuredImage: {
      src: {
        type: String,
        trim: true,
        default: ""
      },
      name: {
        type: String,
        trim: true,
        default: ""
      },
      alt: {
        type: String,
        trim: true,
        default: ""
      }
    },
    isDraft: {
      type: Boolean,
      default: false
    },
    isDiscontinued: {
      type: Boolean,
      default: false
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      trim: true,
      default: "variable"
    },
    status: {
      type: String,
      trim: true,
      default: "publish"
    },
    disable: {
      type: Boolean,
      default: false
    },
    featured: {
      type: Boolean,
      default: false
    },
    catalog_visibility: {
      type: Boolean,
      default: true
    },
    description: {
      type: String,
      trim: true,
      default: ""
    },
    short_description: {
      type: String,
      trim: true
      // required: [true, "Please give the description of product"]
    },
    sku: {
      type: String,
      trim: true
      // required: [true, "Please enter the SKU of product"]
    },
    brand: {
      type: String,
      trim: true
      // required: [true, "Please enter the Brand of the product"]
    },
    subBrand: {
      type: String,
      trim: true
    },
    price: {
      type: Object,
      default: {}
    },
    costPrice: {
      type: Number,
      default: 0
    },
    profitPercent: {
      type: Object,
      default: {}
    },
    avgPrice: {
      type: Number,
      default: 0
    },
    retailPrice: {
      type: Number,
      default: 0
    },
    regular_price: {
      type: Number,
      default: 0
    },
    sale_price: {
      type: Number,
      default: 0
    },
    date_on_sale_from: {
      type: Date
      // default: new Date()
    },
    date_on_sale_to: {
      type: Date
    },
    on_sale: {
      type: Boolean,
      default: false
    },
    purchasable: {
      type: Boolean,
      default: true
    },
    bannedPinCode: {
      type: Array,
      default: []
    },
    total_sales: {
      type: Number,
      default: 0
    },
    percentTax: {
      type: Number,
      default: 0
    },
    mlBasedTax: {
      type: Number,
      default: 0
    },
    stateTax: {
      type: Number,
      default: 0
    },
    costTax: {
      type: Number,
      default: 0
    },
    totalTax: {
      type: Number,
      default: 0
    },
    tax_status: {
      type: String,
      trim: true,
      default: "taxable"
    },
    tax_class: {
      type: String,
      trim: true
      // required: [true, "Please enter the tax class of product"]
    },
    manage_stock: {
      type: Boolean,
      default: true
    },
    totalOrder: {
      type: Number,
      default: 0
    },
    upcomingQuantity: {
      type: Number,
      default: 0
    },
    stock_quantity: {
      type: Number,
      default: 0
    },
    handsOnQuantity: {
      type: Number,
      default: 0
    },
    backorders: {
      type: String,
      trim: true,
      default: "no"
    },
    backorders_allowed: {
      type: Boolean,
      default: false
    },
    backordered: {
      type: Boolean,
      default: false
    },
    backorderedQuantity: {
      type: Number,
      default: 0
    },
    minBackorderedQuantity: {
      type: Number,
      default: 0
    },
    weight: {
      type: String,
      trim: true,
      default: ""
    },
    dimensions: {
      length: {
        type: String,
        trim: true,
        default: ""
      },
      width: {
        type: String,
        trim: true,
        default: ""
      },
      height: {
        type: String,
        trim: true,
        default: ""
      }
    },
    shipping_required: {
      type: Boolean,
      default: false
    },
    shipping_taxable: {
      type: Boolean,
      default: true
    },
    shipping_class: {
      type: String,
      trim: true
    },
    // shipping_class_id: 0, //doubt which id it is ?
    shipping_class_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: ""
    },
    upsell_ids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: ""
      }
    ],
    cross_sell_ids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: ""
      }
    ],
    purchase_note: {
      type: String,
      trim: true,
      default: ""
    },
    productUPC: {
      type: Number,
      default: 0
    },
    purchaseAlertNotes: {
      type: String,
      trim: true,
      default: ""
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories"
      }
    ],
    subCategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subcategories"
      }
    ],
    subSubCategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subsubcategories"
      }
    ],
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: ""
      }
    ],
    itemCode: {
      type: String,
      trim: true
    },
    vendors: [
      {
        vendorId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "vendors"
        },
        vendorItemCode: {
          type: String,
          trim: true
        },
        costPrice: {
          type: Number,
          default: 0
        },
        profitPercent: {
          type: Object,
          default: {}
        }
      }
    ],
    galleryImage: [
      {
        src: {
          type: String,
          trim: true,
          default: ""
        },
        name: {
          type: String,
          trim: true,
          default: ""
        },
        alt: {
          type: String,
          trim: true,
          default: ""
        }
      }
    ],
    attributes: [
      {
        name: {
          type: String,
          trim: true,
          default: ""
        },
        options: {
          type: Array,
          default: []
        }
      }
    ],
    // default_attributes: [
    //   {
    //     name: {
    //       type: String,
    //       trim: true,
    //       default: ""
    //     },
    //     option: {
    //       type: String,
    //       trim: true,
    //       default: ""
    //     }
    //   }
    // ],
    variants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "variants"
      }
    ],
    grouped_products: {
      type: Array,
      default: []
    },
    related_ids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: ""
      }
    ],
    stock_status: {
      type: String,
      trim: true,
      default: "instock"
    },
    isStock: {
      type: Boolean,
      default: true
    },
    has_options: {
      type: Boolean,
      default: false
    },
    bundled_by: {
      type: Array,
      default: []
    },
    bundle_stock_status: {
      type: String,
      trim: true,
      default: "instock"
    },
    bundle_stock_quantity: {
      type: Number,
      default: 0
    },
    bundle_virtual: {
      type: Boolean,
      default: false
    },
    bundle_layout: {
      type: String,
      trim: true,
      default: ""
    },
    bundle_add_to_cart_form_location: {
      type: String,
      trim: true,
      default: ""
    },
    bundle_editable_in_cart: {
      type: Boolean,
      default: false
    },
    bundle_sold_individually_context: {
      type: String,
      trim: true,
      default: ""
    },
    isSoldIndividually: {
      type: Boolean,
      default: false
    },
    bundle_item_grouping: {
      type: String,
      trim: true,
      default: ""
    },
    bundle_min_size: {
      type: String,
      trim: true,
      default: ""
    },
    bundle_max_size: {
      type: String,
      trim: true,
      default: ""
    },
    bundled_items: {
      type: Array,
      default: []
    },
    bundle_sell_ids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: ""
      }
    ],
    createdDate: {
      type: String,
      trim: true
    },
    updatedDate: {
      type: String,
      trim: true
    },
    maxAllowQty: {
      type: Number
    },
    minAllowQty: {
      type: Number,
      default: 1
    },
    indirectTax: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    },
    seoScore: {
      type: String,
      trim: true
    },
    seoTitle: {
      type: String,
      trim: true
    },
    readabilityScore: {
      type: String,
      trim: true
    },
    metaDesc: {
      type: String,
      trim: true
    },
    keyPhrase: {
      type: String,
      trim: true
    },
    outgoingInterLinks: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const PRODUCT_MODEL = mongoose.model("Products", productsSchema);

module.exports = PRODUCT_MODEL;
