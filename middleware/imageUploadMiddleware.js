// This file will handle image uploads to your server using Multer and then upload those images to Cloudinary
const multer = require('multer');
const { cloudinary } = require('../config/cloudinaryConfig');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
// Set storage engine
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/'); // Folder where images will be stored
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
//     }
// });
// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//         folder: 'E-Shop',
//         allowed_formats: ['jpg', 'png', 'jpeg'],
//     }
// });


const uploadPhoto = multer({
    storage: multer.memoryStorage(),
    // storage: storage,
    limits: { fileSize: 20 * 1000 * 1000 },
    fileFilter: function (req, file, cb) {
        // if (file.mimetype.startsWith('image/')) {
        //     return cb(new Error('Only images are allowed!'), false);
        // }
        // cb(null, true);
        if(file.mimetype.startsWith('image/')) cb(null, true);
        else cb(new Error('Not an image! Please upload only images.'), false);
    },
});
// function to upload a file to Cloudinary
// use   options = {} 
// optional parameter when need to resize or crop image
const uploadToCloudinary = (buffer,  folder='E_Shop') => {
    return new Promise((resolve, reject ) => {
        cloudinary.uploader.upload_stream({folder}, (error, result) => {
            if(error) reject(error);
            else resolve(result);
        }).end(buffer);
    });
};
// Middleware to resize and upload image
const resizeAndUploadImage = async (req, res, next) => {
    if(!req.files || req.files.length === 0) return next();
    try {
        // adjust the mapping here to pass the file buffer and options to uploadToCloudinary
        const uploadPromises = req.files.map(file => 
            uploadToCloudinary(file.buffer, 'E_Shop/User',
                //below will only be applicable if options is defined
            {
               transformation: [{ width: 200, height: 200, crop: "limit" }]  
            })
        );

        const result = await Promise.all(uploadPromises);
        req.imageUrls = result.map(result => result.url);
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    uploadPhoto,
    resizeAndUploadImage,
    uploadToCloudinary
}