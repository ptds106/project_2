const express = require('express');
const router = express.Router();
const medivalsCtrl = require('../../controller/wars/medivals');

router.get('/', medivalsCtrl.index);
router.get('/:id', medivalsCtrl.show);
router.delete('/delete/:id', medivalsCtrl.delete);
router.post('/comments/:id', isLoggedIn, medivalsCtrl.addComments);
function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
  }
module.exports = router;