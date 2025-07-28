// import mongoose, { Schema } from "mongoose";

// const userSchema = new Schema({
//   name: {
//     required: true,
//     type: String,
//   },
//   email: {
//     required: true,
//     type: String,
//   },
//   contact: {
//     required: false,
//     type: String,
//   },
//   password: {
//     required: true,
//     type: String,
//   },
//   image: {
//     required: false,
//     type: String,
//   },
//   shipingAddress: {
//     city: {
//       required: false,
//       type: String,
//     },
//     phone: {
//       required: false,
//       type: String,
//     },
//     postcode: {
//       required: false,
//       type: String,
//     },
//     houseName: {
//       required: false,
//       type: String,
//     },
//   },

//   billingAddress: {
//     city: {
//       required: false,
//       type: String,
//     },
//     phone: {
//       required: false,
//       type: String,
//     },
//     postcode: {
//       required: false,
//       type: String,
//     },
//     houseName: {
//       required: false,
//       type: String,
//     },
//   },

//   wishlist: {
//     required: false,
//     type: Array,
//   },

//   cardlist: [
//     {
//       itemId: {
//         required: false,
//         type: String,
//       },
//       itemQuantity: {
//         required: false,
//         type: Number,
//       },
//       addedAt: {
//         required: false,
//         type: Date,
//         default: Date.now
//       },
//     },
//   ],
// });

// export const userModel =
//   mongoose.models.users ?? mongoose.model("users", userSchema);




import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  contact: {
    required: false,
    type: String,
  },
  password: {
    type: String,
    validate: {
      validator: function(value) {
        // If googleId is not present, password is required
        return this.googleId || (value && value.length > 0);
      },
      message: 'Path `password` is required.'
    }
  },
  googleId: {
    type: String,
    required: false,
  },
  image: {
    required: false,
    type: String,
  },
  shipingAddress: {
    city: {
      required: false,
      type: String,
    },
    phone: {
      required: false,
      type: String,
    },
    postcode: {
      required: false,
      type: String,
    },
    houseName: {
      required: false,
      type: String,
    },
  },
  billingAddress: {
    city: {
      required: false,
      type: String,
    },
    phone: {
      required: false,
      type: String,
    },
    postcode: {
      required: false,
      type: String,
    },
    houseName: {
      required: false,
      type: String,
    },
  },
  wishlist: {
    type: Array,
    required: false,
    default: [], // Ensure it's an array by default
  },
  cardlist: [
    {
      itemId: {
        required: false,
        type: String,
      },
      itemQuantity: {
        required: false,
        type: Number,
      },
      addedAt: {
        required: false,
        type: Date,
        default: Date.now,
      },
    },
  ],
});

export const userModel = mongoose.models.users ?? mongoose.model("users", userSchema);
