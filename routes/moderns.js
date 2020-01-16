const express = require('express');
const router = express.Router();
const modernsCtrl = require('../controller/moderns');

// // GET /movies/new
// router.get('/new', ancientsCtrl.new);
router.get('/', modernsCtrl.index);


module.exports = router;