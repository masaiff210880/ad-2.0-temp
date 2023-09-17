const mongoose = require("mongoose");
const validator = require("validator");

const variantSchema = mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products"
    },
    name: {
      type: String,
      trim: true,
      required: [true, "Please enter the variant name"]
    },
    slug: {
      type: String,
      trim: true
      // required: [true, "Please enter the slug of the product"]
    },
    productUPC: {
      type: Number
    },
    // variantType: {
    //   type: String,
    //   trim: true,
    //   default: "variation"
    // },
    status: {
      type: String,
      trim: true,
      default: "publish"
    },
    featured: {
      type: Boolean,
      default: false
    },
    catalog_visibility: {
      type: String,
      trim: true,
      default: "visible"
    },
    flavour: {
      type: String,
      trim: true
      // required: [true, "Please enter the flavour of item"]
    },
    description: {
      type: String,
      trim: true,
      default: ""
    },
    short_description: {
      type: String,
      trim: true
      // required: [true, "Please enter the short description of variant"]
    },
    disable: {
      type: Boolean,
      default: false
    },
    sku: {
      type: String,
      trim: true
      // required: [true, "Please enter the SKU of product"]
    },
    type: {
      type: String,
      trim: true
    },
    productSku: {
      type: String,
      trim: true
    },
    costPrice: {
      type: Number,
      default: 0
    },
    maxAllowQty: {
      type: Number
    },
    minAllowQty: {
      type: Number,
      default: 1
    },
    minPrice: {
      type: Number,
      default: 0
    },
    price: {
      type: Object,
      default: {}
    },
    profitPercent: {
      type: Object,
      default: {}
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
      // default: new Date()
    },
    on_sale: {
      type: Boolean,
      default: false
    },
    purchasable: {
      type: Boolean,
      default: false
    },
    total_sales: {
      type: Number,
      default: 0
    },
    // virtual: {
    //   type: Boolean,
    //   default: false
    // },
    // downloadable: {
    //   type: Boolean,
    //   default: false
    // },
    tax_status: {
      type: String,
      trim: true,
      default: "taxable"
    },
    tax_class: {
      type: String,
      trim: true,
      default: ""
    },
    manage_stock: {
      type: Boolean,
      default: true
    },
    stock_quantity: {
      type: Number,
      default: 0
    },
    handsOnQuantity: {
      type: Number,
      default: 0
    },
    upcomingQuantity: {
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
    low_stock_amount: {
      type: Number,
      default: 0
    },
    sold_individually: {
      type: Boolean,
      default: false
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
      default: false
    },
    shipping_class: {
      type: String,
      trim: true,
      default: ""
    },
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
    // parent_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: ""
    // },
    purchase_note: {
      type: String,
      trim: true,
      default: ""
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: ""
      }
    ],
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: ""
      }
    ],
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
    attributes: [
      {
        name: {
          type: String,
          trim: true,
          default: ""
        },
        options: {
          type: String,
          trim: true,
          default: ""
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
    grouped_products: {
      type: Array,
      default: []
    },
    // menu_order: 0,
    related_ids: [
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
        }
      }
    ],
    isStock: {
      type: Boolean,
      default: true
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    stock_status: {
      type: String,
      trim: true,
      enum: ["instock", "outofstock", "discontinue"],
      default: "instock"
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
      enum: ["instock", "outofstock", "discontinue"],
      default: "outofstock"
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
    ]
  },
  {
    timestamps: true
  }
);

const VARIANT_MODEL = mongoose.model("variants", variantSchema);

module.exports = VARIANT_MODEL;
