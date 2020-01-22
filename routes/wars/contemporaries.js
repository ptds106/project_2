const express = require('express');
const router = express.Router();
const contemporariesCtrl = require('../../controller/wars/contemporaries');

router.get('/', contemporariesCtrl.index);
router.get('/:id', contemporariesCtrl.show);
router.delete('/delete/:id', contemporariesCtrl.delete);
router.post('/comments/:id', isLoggedIn, contemporariesCtrl.addComments);
function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
  }

module.exports = router;