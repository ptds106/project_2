var router = require('express').Router();
var historiesCtrl = require('../../controller/wars/histories');

router.get('/histories', historiesCtrl.index);
router.get('/histories/add-wars', historiesCtrl.new);
router.post('/histories', historiesCtrl.create);
router.get('/histories/views', historiesCtrl.indexView);
router.get('/histories/:id', historiesCtrl.show);
router.delete('/histories/delete/:id', historiesCtrl.delete);
router.get('/histories/edit/:id', historiesCtrl.edit)
router.put('/histories/update/:id', historiesCtrl.update)
router.post('/histories/addToWeapon/:id', historiesCtrl.addToWeapon)
module.exports = router;
