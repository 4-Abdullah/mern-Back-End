const User = require('../model/User')
// const payment = require('./paymentController')
const stripe = require('stripe')(process.env.Stripe_secret_key)

const getOrder = async(req, res) => {
  try{
  console.log("Incoming Request Body:", req.body);
  console.log("Incoming Request params:", req?.query?.username);
   const user = await User.findOne({username: req.query.username})
                .populate('order.productId') // Replace productId with the actual Product document
                .exec();
    
                if (!user) {
                  return res.status(404).json({ message: `No user found with username ${req.query.username}.` });
                }
            
                // Send the user's cart as a response
                res.status(200).json({ order: user.order });
              } catch (err) {
                console.error("Error fetching order:", err);
                res.status(500).json({ message: "Internal server error" });
              }
            };

const payment = async (req, res, id, quantity, username) => {
 
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [{
      price_data: {
          currency: 'PKR',
          product_data: {
              name: id.productname,
              images: [id.image[0]] // Wrap in an array
          },
          unit_amount: id.price * 100, // Convert to smallest unit
      },
      quantity: quantity, // Outside price_data
  }],
    mode: "payment",
    success_url: `https://front-end-lemon-seven.vercel.app/success/${id._id}?username=${username}`,
    cancel_url: `https://front-end-lemon-seven.vercel.app/cancel/${id._id}?username=${username}`,
  })
  console.log(session.id)
  return {id:session.id};

};

const addtoOrder = async(req, res) => {
 try{
    console.log("Incoming Request Body:", req.body);
    console.log("Incoming Request params:", req?.query?.username);
    const username = req.query.username
    const { id, quantity } = req.body.productObj;
    const  formData = req.body.formData
    console.log(id, quantity, formData)
     
    const user = await User.findOne({username: req.query.username})
                .populate('order.productId') // Replace productId with the actual Product document
                .exec();
    
                if (!user) {
                  return res.status(404).json({ message: `No order found with username ${req.query.username}.` });
                }

    const paymentResponse = await payment(req, res, id, quantity, username);
    if (paymentResponse.id) {
      // Update the quantity of the existing product in the cart
       user.order.push({
        productId: id._id,
        quantity: quantity,
        shippingDetails: formData 
      });
      
       // Save the updated user document
    const updatedUser = await user.save(); 
    console.log(updatedUser)
    console.log(paymentResponse.id)
         res.status(200).json({ order: updatedUser.order, sessionId: paymentResponse.id });

    }
     else {
    //   // Add the new product to the cart
    //  cartItem.quantity ++;

    res.status(500).json({
        message: 'Failed to place order'
    })
    }
    
   
  } catch (err) {
                console.error("Error fetching order:", err);
                res.status(500).json({ message: "Internal server error" });
              }
}

const removefromOrder = async(req, res) => {
  try{
     console.log("Incoming Request Body:", req.body);
     console.log("Incoming Request params:", req?.query?.username);
     const { _id } = req.body[0];
     // const quantity = 
     console.log(_id)
     const user = await User.findOne({username: req.query.username})
                 .populate('order.productId') // Replace productId with the actual Product document
                 .exec();
     //  const product = await User.findOne({ _id: req.query.username }).exec()
                 if (!user) {
                   return res.status(404).json({ message: `No order found with username ${req.query.username}.` });
                 }
             
                 // Check if the product is already in the cart
   const orderItem = user.order.findIndex(item => item.productId._id.toString() === _id);
 
   if (orderItem > -1) {
    user.order.splice(orderItem, 1); // Remove the item at the found index
    // await user.save(); // Save the updated cart
    // res.status(200).json({ message: "Product removed from cart", cart: user.cart });
  } else {
    res.status(404).json({ message: "Product not found in order" });

  }
     // Save the updated user document
     const updatedUser = await user.save(); 
     // const populatedCart = await User.findById(updatedUser._id).populate('cart.productId').exec();
                 res.status(200).json({ message: "Product removed from order", order: updatedUser.order });
   } catch (err) {
                 console.error("Error fetching order:", err);
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
                 .populate('order.productId') // Replace productId with the actual Product document
                 .exec();
     //  const product = await User.findOne({ _id: req.query.username }).exec()
                 if (!user) {
                   return res.status(404).json({ message: `No order found with username ${req.query.username}.` });
                 }
             
                 // Check if the product is already in the cart
   const cartItem = user.order.find(item => item.productId._id.toString() === _id);
 
   if (cartItem) {
    cartItem.quantity ++;
     // Remove the item at the found index
    // await user.save(); // Save the updated cart
    // res.status(200).json({ message: "Product removed from cart", cart: user.cart });
  } else {
    res.status(404).json({ message: "Product not found in order" });

  }
   // Save the updated user document
   const updatedUser = await user.save(); 
   // const populatedCart = await User.findById(updatedUser._id).populate('cart.productId').exec();
               res.status(200).json({ message: "Product removed from order", order: updatedUser.order });
 } catch (err) {
               console.error("Error fetching order:", err);
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
                 .populate('order.productId') // Replace productId with the actual Product document
                 .exec();
     //  const product = await User.findOne({ _id: req.query.username }).exec()
                 if (!user) {
                   return res.status(404).json({ message: `No order found with username ${req.query.username}.` });
                 }
             
                 // Check if the product is already in the cart
   const orderItem = user.order.find(item => item.productId._id.toString() === _id);
 
   if (orderItem) {
    orderItem.quantity --; // Remove the item at the found index
    // await user.save(); // Save the updated cart
    // res.status(200).json({ message: "Product removed from cart", cart: user.cart });
  } else {
    res.status(404).json({ message: "Product not found in order" });

  }
   // Save the updated user document
   const updatedUser = await user.save(); 
   // const populatedCart = await User.findById(updatedUser._id).populate('cart.productId').exec();
               res.status(200).json({ message: "Product removed from order", order: updatedUser.order });
 } catch (err) {
               console.error("Error fetching order:", err);
               res.status(500).json({ message: "Internal server error" });
             }
}

const getOrderlength = async(req, res) => {
  
     console.log("Incoming Request Body:", req.body);
     console.log("Incoming Request params:", req?.query?.username);
    //  const { _id } = req.body[0];
     // const quantity = 
    //  console.log(_id)
     const user = await User.findOne({username: req.query.username})
                 .populate('order.productId') // Replace productId with the actual Product document
                 .exec();
     //  const product = await User.findOne({ _id: req.query.username }).exec()
                 if (!user) {
                   return res.status(404).json({ message: `No order found with username ${req.query.username}.` });
                 }

                 const orderLength = user.order.length; // Assuming you're receiving the JSON in req.body
                 console.log(`Cart length: ${orderLength}`);
                 
                res.status(200).json({ order: orderLength });

                }

module.exports = {
    getOrder,
    addtoOrder,
    removefromOrder,
    increaseProductQuantity,
    decreaseProductQuantity,
    getOrderlength
}