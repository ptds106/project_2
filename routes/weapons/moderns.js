const express = require('express');
const router = express.Router();
const modernsCtrl = require('../../controller/wars/moderns');

router.get('/', modernsCtrl.index);
router.get('/:id', modernsCtrl.show);
router.delete('/delete/:id', modernsCtrl.delete);

module.exports = router;