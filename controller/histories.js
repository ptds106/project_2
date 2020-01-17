const History = require('../models/history');


function index(req, res, next) {
  let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
  let sortKey = req.query.sort || 'name';
  History.find(modelQuery)
  .sort(sortKey).exec(function(err, histories) {
    if (err) return next(err);
    res.render('index', { 
      histories, 
      user: req.user,
      name: req.query.name, 
      sortKey });
  });
}
 function addFact(req, res, next) {
   req.user.facts.push(req.body);
   req.user.save(function(err) {
     res.redirect('/histories');
   });
 }
function delFact(req, res, next) {
  req.user.facts.pop();
  req.user.save(function(err) {
    res.redirect('/histories')
  });
}
module.exports = {
  index,
  addFact,
  delFact
};
