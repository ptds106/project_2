var router = require('express').Router();
var historiesCtrl = require('../controller/histories');

router.get('/histories', historiesCtrl.index);
router.get('/histories/add-wars', historiesCtrl.new);


router.delete('/histories/:id', historiesCtrl.delete);


// router.post('/histories/add-wars', historiesCtrl.new);
// router.post('/histories', isLoggedIn, historiesCtrl.new);

// function isLoggedIn(req, res, next) {
//     if ( req.isAuthenticated() ) return next();
//     res.redirect('/auth/google');
//   }


module.exports = router;
