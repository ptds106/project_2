const express = require('express');
const router = express.Router();
const modernsCtrl = require('../../controller/wars/moderns');

router.get('/', modernsCtrl.index);
router.get('/:id', modernsCtrl.show);
router.delete('/delete/:id', modernsCtrl.delete);
router.post('/comments/:id', isLoggedIn, modernsCtrl.addComments);
function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
  }
module.exports = router;