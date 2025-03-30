const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));   
})

path.join(__dirname, '..', 'views', '.')
router.get('../views/')
module.exports = router