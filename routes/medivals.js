const express = require('express');
const router = express.Router();
const medivalsCtrl = require('../controller/medivals');

// // GET /movies/new
// router.get('/new', medivalsCtrl.new);
router.get('/', medivalsCtrl.index);
router.get('/:id', medivalsCtrl.show);

module.exports = router;