var router = require('express').Router();
var weaponsCtrl = require('../controller/weapons');

router.get('/', weaponsCtrl.index);
router.get('/add-weapons', weaponsCtrl.new);
router.post('/', weaponsCtrl.create)

module.exports = router;
