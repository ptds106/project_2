const express = require('express');
const router = express.Router();
const medivalsCtrl = require('../../controller/weapons/medivals');

router.get('/', medivalsCtrl.index);
router.get('/:id', medivalsCtrl.show);
router.delete('/delete/:id', medivalsCtrl.delete);
module.exports = router;