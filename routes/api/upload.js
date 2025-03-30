const express = require('express');
const router = express.Router();
const upload = require('../../middleware/imageUploadMiddleware')
const ROLES_LIST = require('../../config/roles_list')
const verfiyRoles = require('../../middleware/verifyRoles')


router.post(
    '/upload',
    // verfiyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), 
    upload.uploadPhoto.array('images', 5),
    upload.resizeAndUploadImage,
    (req, res) => {
        if (!req.files) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const filePaths = req.files.path;
        res.json({
            message: "Images uploaded successfully",
            urls: req.imageUrls,
            filePaths: filePaths
        });
    }
);

module.exports = router