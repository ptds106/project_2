var router = require('express').Router();
var historiesCtrl = require('../../controller/wars/histories');

router.get('/histories', historiesCtrl.index);
router.get('/histories/views', historiesCtrl.indexView);
router.get('/histories/add-wars', historiesCtrl.new);
router.post('/histories', historiesCtrl.create)
router.delete('/delete/:id', historiesCtrl.delete);

module.exports = router;
