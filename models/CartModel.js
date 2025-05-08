const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  albumFormat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AlbumFormat",
    required: true,
  },
  quantity: {
    type: Number,
    min: 1,
  },
});

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, 
    },
    items: [cartItemSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);