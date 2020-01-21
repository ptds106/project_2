const express = require('express');
const router = express.Router();
const contemporariesCtrl = require('../../controller/wars/contemporaries');

router.get('/', contemporariesCtrl.index);
router.get('/:id', contemporariesCtrl.show);
router.delete('/delete/:id', contemporariesCtrl.delete);
router.post('/comments', contemporariesCtrl.addComments);

module.exports = router;