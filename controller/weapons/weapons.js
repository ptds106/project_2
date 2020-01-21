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
const show = (req, res) => {
  Weapon.findById(req.params.id, (err, weapons) => {
        res.render('histories/weapons/histories-show', { 
          weapons,
          user: req.user,
          name: req.query.name
        });
      });
};

const create = (req, res) => {
  console.log("this is create weapons");
  const createWeapons = new Weapon(req.body);
  createWeapons.save(err => {
    if (err) return res.redirect("/weapons/add-weapons");
    res.redirect("/weapons/views");
  });
};
const indexView = (req, res) => {
  Weapon.find({}, (err, weapon) => {
    if (err) {
      res.render("error");
    }
    const sortedWeapons = weapon.sort((a, b) => (a.weaponYear > b.weaponYear) ? 1 : -1)
    res.render("histories/weapons/histories", {
      weaponSorted: sortedWeapons,
      id: req.params.id,
      user: req.user,
      name: req.query.name,
      histories: weapon,
    });
  }); 
}
const deleteWeapons = (req, res) => {
  console.log('deleting contemporary ID')
  Weapon.findOneAndDelete({ _id: req.params.id }, (err, deletedItem) => {});
  res.redirect("/views");
};
module.exports = {
  index,
  indexView,
  create,
  show,
  new: newWeapon,
  delete: deleteWeapons,
};
