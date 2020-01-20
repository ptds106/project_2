const express = require('express');
const router = express.Router();
const ancientsCtrl = require('../controller/ancients');
var usersCtrl = require('../controller/users');

// // GET /movies/new
// router.get('/new', ancientsCtrl.new);
router.get('/', ancientsCtrl.index, usersCtrl.index);
router.get('/:id', ancientsCtrl.show);
router.delete('/delete/:id', ancientsCtrl.delete);

module.exports = router;