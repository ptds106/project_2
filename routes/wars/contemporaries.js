const express = require('express');
const router = express.Router();
const contemporariesCtrl = require('../../controller/wars/contemporaries');

router.get('/', contemporariesCtrl.index);
router.get('/:id', contemporariesCtrl.show);
router.delete('/delete/:id', contemporariesCtrl.delete);

module.exports = router;