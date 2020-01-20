const express = require('express');
const router = express.Router();
const contemporariesCtrl = require('../controller/contemporaries');
var usersCtrl = require('../controller/users');

// // GET /movies/new
// router.get('/new', ancientsCtrl.new);
router.get('/', contemporariesCtrl.index, usersCtrl.index);
router.get('/:id', contemporariesCtrl.show);
router.delete('/delete/:id', contemporariesCtrl.delete);

module.exports = router;