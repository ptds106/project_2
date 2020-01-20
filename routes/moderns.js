const express = require('express');
const router = express.Router();
const modernsCtrl = require('../controller/moderns');
var usersCtrl = require('../controller/users');

router.get('/', modernsCtrl.index);
router.get('/:id', modernsCtrl.show);
router.delete('/delete/:id', modernsCtrl.delete);

module.exports = router;