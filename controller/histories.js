const History = require("../models/history");

const newWar = (req, res) => {
  res.render("histories/crud/add-wars", {
    user: req.user,
    name: req.query.name,
  });
};

function index(req, res, next) {
  let modelQuery = req.query.name
    ? { name: new RegExp(req.query.name, "i") }
    : {};
  let sortKey = req.query.sort || "name";
  History.find(modelQuery)
    .sort(sortKey)
    .exec(function(err, histories) {
      if (err) return next(err);
      res.render("index", {
        histories,
        user: req.user,
        name: req.query.name,
        sortKey
      });
    });
}
function addWar(req, res, next) {
  req.user.push(req.body);
  req.user.save(function(err) {
    res.redirect("histories/crud/add-wars");
  });
}

const create = (req, res) => {

 console.log("this is create")
 const war = new History(req.body);
 war.save(err => {
   if (err) return res.redirect("histories/crud/add-wars");
   res.redirect("/histories");
 });
 console.log(war)
};


function delWar(req, res, next) {
  req.user.facts.pop();
  req.user.save(function(err) {
    res.redirect("/histories");
  });
}
module.exports = {
  index,
  create,
  new: newWar,
  addWar,
  delete: delWar
};
