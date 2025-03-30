const  cloudinary = require('cloudinary').v2;

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.Cloudinary_name, 
        api_key: process.env.Cloudinary_API_key, 
        api_secret: process.env.Cloudinary_API_secret 
    });
    
    // const image = '../../public/img/Madara-Uchiha.jpg';

    // cloudinary.uploader.upload(image).then(result => {
    //     console.log(result)
    // })

    module.exports = { cloudinary }