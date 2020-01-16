const express = require('express');
const router = express.Router();
const contemporariesCtrl = require('../controller/contemporaries');

// // GET /movies/new
// router.get('/new', ancientsCtrl.new);
router.get('/', contemporariesCtrl.index);


module.exports = router;