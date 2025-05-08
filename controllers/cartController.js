const Cart = require("../models/CartModel");
const AlbumFormat = require("../models/albumFormatModel");


const getCart = async (req, res) => {
  const userId = req.params.userId;
 
  
  try {
    if (!req.user) {
      return res.status(401).send({ message: 'USer Auth' });
    }
    let cart = await Cart.findOne({ user: req.user._id })
    .populate({
      path: 'items.albumFormat',
      populate: [
        { path: 'albumType', select: 'name' },
        { path: 'album',     select: 'title artist' }
      ]
    });

   
    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        items: []
      });
      await cart.save();}
      res.json(cart);
    if (!cart) return res.status(404).json({ message: "Cart not found" });
   
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const addToCart = async (req, res) => {
  console.log("POST");
  
  if (!req.user) {    
    console.log("BAD USER");
    
    return res.status(401).send({ message: 'No User Auth' });
  }
  
  const { albumFormatId, quantity } = req.body;
  try {
    console.log("TRY");
    
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    const existingItem = cart.items.find(item => item.albumFormat.toString() === albumFormatId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ albumFormat: albumFormatId, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.log("ERROR",error);
    
    res.status(500).json({ message: error.message });
  }
};


const updateQuantity = async (req, res) => {
  console.log("QUANTITU");
  const { itemId } = req.params;
  const { quantity } = req.body;
  console.log("QUANTITU");
  
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.id(itemId);
   
   
    if (!item) return res.status(404).json({ message: "Item not found" });
    item.quantity = quantity;
    
 
    await cart.populate({
      path: 'items.albumFormat',
      populate:[
        {
          path: 'albumType',
          select: 'name'
        },
        { path: 'album', select: 'title' }
      ]
    });
    
    res.status(200).json(cart)
    await cart.save();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteProduct = async (req, res) => {
  console.log("delete");
  
  const { itemId } = req.params;
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(item => item._id.toString() !== itemId);
    await cart.save();


    const populated = await Cart.findById(cart._id)
    .populate({
      path: 'items.albumFormat',
      populate: [
        { path: 'albumType', select: 'name' },
        { path: 'album', select: 'title' }
      ]
    });

    
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = [];
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
    getCart,
    addToCart,
    updateQuantity,
    deleteProduct,
    clearCart,
};