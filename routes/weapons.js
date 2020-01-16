var express = require('express')
var router = express.Router()
var weaponsCtrl = require('../controllers/weapons')

router.post('/', weaponsCtrl.create)
router.get('/new', weaponsCtrl.new)
router.post('/:id', weaponsCtrl.addToFlight)

module.exports = router
