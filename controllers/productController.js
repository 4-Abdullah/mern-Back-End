const Product = require('../model/Product')
const upload = require('../middleware/imageUploadMiddleware')

const getAllProducts = async (req, res) => {
    console.log("Incoming Request Body:", req.body);
    const limit = parseInt(req.query.limit, 10) || 1; // Default to 1 product per page
    const offset = parseInt(req.query.offset, 10) || 0;
    
    const Products = await Product.find();
    if (!Products) return res.status(204).json({ 'message': "No Products found" });
    // if(req.query.search){
    //     const filterProducts = Products.filter(product => product.productname.includes(req.query.search))
    //         res.json(filterProducts)
    //         // return    
    // }
    if(req.query.limit  && req.query.offset){
        const limitproducts = await Product.find()
        .skip(offset)
        .limit(limit);
        res.json(limitproducts);
        return
    }
    if (req.query.search) {
        const searchQuery = req.query.search.toLowerCase();
        const filteredProducts = Products.filter(product => 
            product.productname.toLowerCase().startsWith(searchQuery)
            // .includes(searchQuery)
        );
        res.json(filteredProducts);
        return
    }
    res.json(Products);

}

const getProductsbyCategory = async (req, res) => {
    console.log("Incoming Request Body:", req.body);
    const searchQuery = req.query.category;
    const Products = await Product.find();

    const filteredProducts = Products.filter(product => 
        product.category.includes(searchQuery))
        res.json(filteredProducts);
}

const createNewProduct = async (req, res) => {
    console.log('Request body:', req.body); // Logs text fields
    console.log('Request file:', req.file);
    const { productname, category,description,  price, quantity } = req.body;
    
    if (!productname || !category || !quantity || !price) {
        return res.status(400).json({ 'message': 'productname, category, image, quantity and price are required.'})
    }
    try {
        let imageUrls = [];
        // Check if a single file was uploaded
        if (req.file) {
            const result = await upload.uploadToCloudinary(req.file['file0'][0].buffer, "E_Shop/Products");
            imageUrls.push(result.url);
        }

        // Check if multiple files were uploaded
        if (req.files && req.files.length > 0) {
            const uploadPromises = req.files.map(file => upload.uploadToCloudinary(file.buffer, "E_Shop/Products"));
            const results = await Promise.all(uploadPromises);
            imageUrls = results.map(result => result.url);
        }
// ✅ Ensure `imageUrls` is not empty before creating the product
if (imageUrls.length === 0) {
    return res.status(400).json({ message: "At least one image is required." });
}
        console.log("Uploaded Files:", req.files);
        const result = await Product.create({
            productname: productname,
            category:category,
            image: imageUrls,
            price: price,
            quantity: quantity,
            description: description
        });
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

const updateProduct = async (req, res) => {
    console.log('Request body:', req.body); // Logs text fields
    console.log('Request file:', req.file);
    const {   productname, category, description,  price, quantity, image, id } = req.body; // Access form fields except the image
    
    console.log(id, image);
  
    try {
        let imageUrls = [];
        // Check if a single file was uploaded
        if (req.file) {
            const resultImg = await upload.uploadToCloudinary(req.file.buffer, "E_Shop/Products");
            console.log(resultImg)
            imageUrls.push(resultImg.url);
        }
            console.log(imageUrls)
        
   const product = await Product.findOne({ _id: req.body.id }).exec()
  
   if (!product) {
    return res.status(204).json({ 'message': `No product matches ID ${req.body.id}.`});
   }
    if(req.body?.productname) product.productname = productname
    if(req.body?.category) product.category = category
    if(req.body?.description) product.description = description
    if(req.body?.price) product.price = price
    if(req.body?.quantity) product.quantity = quantity
    if(imageUrls[0]) product.image[0] = imageUrls[0]
    const result = await product.save()
     res.json(result);
}
catch (err) {
    console.error(err);
}
}

const deleteProduct = async (req, res) => {
    if(!req?.body?.id) return res.status(400).json({'message': `Product ID required.`});
   
    const product = await Product.findOne({ _id: req.body.id }).exec()
    if (!product) {
        return res.status(204).json({ 'message': `No product matches ID ${req.body.id}.`});
    }
    const result = await product.deleteOne({ _id: req.body.id });
    res.json(result);
}

const getProduct = async (req, res) => {
    console.log("Incoming Request Body:", req.body);
    console.log("Incoming Request params:", req?.params?.id);
    
    if(!req?.params?.id) return res.status(400).json({'message': `Employee ID required.`});
   
    const product = await Product.findOne({ _id: req.params.id }).exec();
    if (!product) {
        return res.status(204).json({ 'message': `No product matches ID ${req.params.id}.`});
    }
    res.json([product]);
}

module.exports = {
    getAllProducts,
    createNewProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getProductsbyCategory
}