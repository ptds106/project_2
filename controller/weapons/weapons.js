const Weapon = require("../../models/weapon");
const History = require("../../models/history");


const newWeapon = (req, res) => {
  console.log('you are in weapon')
  Weapon.find({}, (err, weapon) => {
    if (err) {
      res.render("error");
    }
    res.render("histories/crud/add-weapons", {
      id: req.params.id,
      user: req.user,
      name: req.query.name,
      histories: weapon
    });
  });
};

function index(req, res, next) {
  let modelQuery = req.query.name
    ? { name: new RegExp(req.query.name, "i") }
    : {};
  let sortKey = req.query.sort || "name";
  Weapon.find(modelQuery)
    .sort(sortKey)
    .exec(function(err, weapons) {
      if (err) return next(err);
      res.render("/weapons", {
        weapons,
        user: req.user,
        name: req.query.name,
        sortKey
      });
    });
}
const create = (req, res) => {
  console.log("this is create");
  const createWeapons = new Weapon(req.body);
  createWar.save(err => {
    if (err) return res.redirect("histories/crud/add-weapons");
    res.redirect("/weapons");
  });
};

module.exports = {
  index,
  create,
  new: newWeapon,
};
