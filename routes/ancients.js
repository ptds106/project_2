const express = require('express');
const router = express.Router();
const ancientsCtrl = require('../controller/ancients');

// // GET /movies/new
// router.get('/new', ancientsCtrl.new);
router.get('/', ancientsCtrl.index);


module.exports = router;