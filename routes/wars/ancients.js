const express = require('express');
const router = express.Router();
const ancientsCtrl = require('../../controller/wars/ancients');

router.get('/', ancientsCtrl.index);
router.get('/:id', ancientsCtrl.show);
router.delete('/delete/:id', ancientsCtrl.delete);
router.post('/comments/:id', isLoggedIn, ancientsCtrl.addComments);
function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
  }
module.exports = router;