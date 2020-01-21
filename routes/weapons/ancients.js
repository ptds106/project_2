const express = require('express');
const router = express.Router();
const ancientsCtrl = require('../../controller/weapons/ancients');

router.get('/', ancientsCtrl.index);
router.get('/:id', ancientsCtrl.show);
router.delete('/delete/:id', ancientsCtrl.delete);
module.exports = router;