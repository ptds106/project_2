const express = require('express');
const router = express.Router();
const historiesCtrl = require('../controller/histories');

// // GET /movies/new
router.get('/new', historiesCtrl.new);
router.get('/', historiesCtrl.index);

// router.post('/', historiesCtrl.create);
router.get('/:id', historiesCtrl.show);
router.get('/:id/edit', historiesCtrl.edit)
router.put('/:id/update', historiesCtrl.update)

router.delete('/:id/delete', historiesCtrl.delete)

module.exports = router;