var router = require('express').Router();
var weaponsCtrl = require('../../controller/weapons/weapons');

router.get('/', weaponsCtrl.index);
router.get('/views', weaponsCtrl.indexView);
router.get('/add-weapons', weaponsCtrl.new);
router.post('/', weaponsCtrl.create)
router.delete('/delete/:id', weaponsCtrl.delete);

module.exports = router;
