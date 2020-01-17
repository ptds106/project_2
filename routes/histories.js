var router = require('express').Router();
var historiesCtrl = require('../controller/histories');

// GET /histories
router.get('/histories', historiesCtrl.index);

// POST /facts
// We will already have access to the logged in student on
// the server, therefore do not use: /histories/:id/facts
router.post('/histories', historiesCtrl.addFact);

// DELETE /facts/:id
router.delete('/histories/:id', historiesCtrl.delFact);
router.post('/histories', isLoggedIn, historiesCtrl.addFact);
function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
  }
module.exports = router;
