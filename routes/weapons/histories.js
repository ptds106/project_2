var router = require('express').Router();
var weaponsCtrl = require('../../controller/weapons/weapons');

router.get('/', weaponsCtrl.index);
router.get('/add-weapons', weaponsCtrl.new);
router.post('/', weaponsCtrl.create);
router.get('/views', weaponsCtrl.indexView);
router.get('/:id', weaponsCtrl.show);
router.delete('/delete/:id', weaponsCtrl.delete);
router.get('/edit/:id', weaponsCtrl.edit)
router.put('/update/:id', weaponsCtrl.update)
router.post('/cross/:id', weaponsCtrl.addToHistory)
module.exports = router;
