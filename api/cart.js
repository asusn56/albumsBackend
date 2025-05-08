const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const  {getCart,addToCart,updateQuantity,  clearCart,deleteProduct}  = require("../controllers/cartController");

router.get("/", auth, getCart);
router.post("/", auth, addToCart);
router.put("/:itemId", auth, updateQuantity);
router.delete("/:itemId", auth, deleteProduct);
router.delete("/", auth, clearCart);


module.exports = router;
