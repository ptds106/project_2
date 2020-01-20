const express = require('express');
const router = express.Router();
const ancientsCtrl = require('../../controller/wars/ancients');

router.get('/', ancientsCtrl.index);
router.get('/:id', ancientsCtrl.show);
router.delete('/delete/:id', ancientsCtrl.delete);
router.post('/', ancientsCtrl.addComments);
module.exports = router;