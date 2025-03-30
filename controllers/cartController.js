const User = require('../model/User')

const getCart = async(req, res) => {
  try{
  console.log("Incoming Request Body:", req.body);
  console.log("Incoming Request params:", req?.query?.username);
   const user = await User.findOne({username: req.query.username})
                .populate('cart.productId') // Replace productId with the actual Product document
                .exec();
    
                if (!user) {
                  return res.status(404).json({ message: `No user found with username ${req.query.username}.` });
                }
            
                // Send the user's cart as a response
                res.status(200).json({ cart: user.cart });
              } catch (err) {
                console.error("Error fetching cart:", err);
                res.status(500).json({ message: "Internal server error" });
              }
            };


const addtoCart = async(req, res) => {
 try{
    console.log("Incoming Request Body:", req.body);
    console.log("Incoming Request params:", req?.query?.username);
    const { _id } = req.body[0];
    // const quantity = 
    console.log(_id)
    const user = await User.findOne({username: req.query.username})
                .populate('cart.productId') // Replace productId with the actual Product document
                .exec();
    //  const product = await User.findOne({ _id: req.query.username }).exec()
                if (!user) {
                  return res.status(404).json({ message: `No cart found with username ${req.query.username}.` });
                }
            
                // Check if the product is already in the cart
  const cartItem = user.cart.find(item => item.productId && item.productId._id.toString() === _id);

    if (!cartItem) {
      // Update the quantity of the existing product in the cart
       user.cart.push({
        productId: _id,
      });
    } else {
    //   // Add the new product to the cart
     cartItem.quantity ++;
    }

    // Save the updated user document
    const updatedUser = await user.save(); 
    // const populatedCart = await User.findById(updatedUser._id).populate('cart.productId').exec();
                res.status(200).json({ cart: updatedUser.cart });
  } catch (err) {
                console.error("Error fetching cart:", err);
                res.status(500).json({ message: "Internal server error" });
              }
}

const removefromCart = async(req, res) => {
  try{
     console.log("Incoming Request Body:", req.body);
     console.log("Incoming Request params:", req?.query?.username);
     const { _id } = req.body[0];
     // const quantity = 
     console.log(_id)
     const user = await User.findOne({username: req.query.username})
                 .populate('cart.productId') // Replace productId with the actual Product document
                 .exec();
     //  const product = await User.findOne({ _id: req.query.username }).exec()
                 if (!user) {
                   return res.status(404).json({ message: `No cart found with username ${req.query.username}.` });
                 }
             
                 // Check if the product is already in the cart
   const cartItem = user.cart.findIndex(item => item.productId._id.toString() === _id);
 
   if (cartItem > -1) {
    user.cart.splice(cartItem, 1); // Remove the item at the found index
    // await user.save(); // Save the updated cart
    // res.status(200).json({ message: "Product removed from cart", cart: user.cart });
  } else {
    res.status(404).json({ message: "Product not found in cart" });

  }
     // Save the updated user document
     const updatedUser = await user.save(); 
     // const populatedCart = await User.findById(updatedUser._id).populate('cart.productId').exec();
                 res.status(200).json({ message: "Product removed from cart", cart: updatedUser.cart });
   } catch (err) {
                 console.error("Error fetching cart:", err);
                 res.status(500).json({ message: "Internal server error" });
               }
 }
 const increaseProductQuantity = async(req, res) => {
  try{
     console.log("Incoming Request Body:", req.body);
     console.log("Incoming Request params:", req?.query?.username);
     const { _id } = req.body[0];
     // const quantity = 
     console.log(_id)
     const user = await User.findOne({username: req.query.username})
                 .populate('cart.productId') // Replace productId with the actual Product document
                 .exec();
     //  const product = await User.findOne({ _id: req.query.username }).exec()
                 if (!user) {
                   return res.status(404).json({ message: `No cart found with username ${req.query.username}.` });
                 }
             
                 // Check if the product is already in the cart
   const cartItem = user.cart.find(item => item.productId._id.toString() === _id);
 
   if (cartItem) {
    cartItem.quantity ++;
     // Remove the item at the found index
    // await user.save(); // Save the updated cart
    // res.status(200).json({ message: "Product removed from cart", cart: user.cart });
  } else {
    res.status(404).json({ message: "Product not found in cart" });

  }
   // Save the updated user document
   const updatedUser = await user.save(); 
   // const populatedCart = await User.findById(updatedUser._id).populate('cart.productId').exec();
               res.status(200).json({ message: "Product removed from cart", cart: updatedUser.cart });
 } catch (err) {
               console.error("Error fetching cart:", err);
               res.status(500).json({ message: "Internal server error" });
             }
}

const decreaseProductQuantity = async(req, res) => {
  try{
     console.log("Incoming Request Body:", req.body);
     console.log("Incoming Request params:", req?.query?.username);
     const { _id } = req.body[0];
     // const quantity = 
     console.log(_id)
     const user = await User.findOne({username: req.query.username})
                 .populate('cart.productId') // Replace productId with the actual Product document
                 .exec();
     //  const product = await User.findOne({ _id: req.query.username }).exec()
                 if (!user) {
                   return res.status(404).json({ message: `No cart found with username ${req.query.username}.` });
                 }
             
                 // Check if the product is already in the cart
   const cartItem = user.cart.find(item => item.productId._id.toString() === _id);
 
   if (cartItem) {
    cartItem.quantity --; // Remove the item at the found index
    // await user.save(); // Save the updated cart
    // res.status(200).json({ message: "Product removed from cart", cart: user.cart });
  } else {
    res.status(404).json({ message: "Product not found in cart" });

  }
   // Save the updated user document
   const updatedUser = await user.save(); 
   // const populatedCart = await User.findById(updatedUser._id).populate('cart.productId').exec();
               res.status(200).json({ message: "Product removed from cart", cart: updatedUser.cart });
 } catch (err) {
               console.error("Error fetching cart:", err);
               res.status(500).json({ message: "Internal server error" });
             }
}

const getCartlength = async(req, res) => {
  
     console.log("Incoming Request Body:", req.body);
     console.log("Incoming Request params:", req?.query?.username);
    //  const { _id } = req.body[0];
     // const quantity = 
    //  console.log(_id)
     const user = await User.findOne({username: req.query.username})
                 .populate('cart.productId') // Replace productId with the actual Product document
                 .exec();
     //  const product = await User.findOne({ _id: req.query.username }).exec()
                 if (!user) {
                   return res.status(404).json({ message: `No cart found with username ${req.query.username}.` });
                 }

                 const cartLength = user.cart.length; // Assuming you're receiving the JSON in req.body
                 console.log(`Cart length: ${cartLength}`);
                 
                res.status(200).json({ cart: cartLength });

                }

module.exports = {
    getCart,
    addtoCart,
    removefromCart,
    increaseProductQuantity,
    decreaseProductQuantity,
    getCartlength
}