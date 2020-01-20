const History = require("../../models/history");
var Weapon = require("../../models/weapon");

const index = (req, res) => {
  Weapon.find({}, (err, weapon) => {
    if (err) {
      res.render("error");
    }
    const sortedWeapons = weapon.sort((a, b) =>
      a.weaponYear > b.weaponYear ? 1 : -1
    );
    res.render("histories/weapons/contemporaries", {
      weaponsSorted: sortedWeapons,
      id: req.params.id,
      user: req.user,
      name: req.query.name,
      histories: weapon
    });
  });
};
const show = (req, res) => {
  Weapon.findById(req.params.id, (err, weapon) => {
    res.render("histories/weapons/contemporaries-show", {
      weapon,
      user: req.user,
      name: req.query.name
    });
  });
};

const deleteWars = (req, res) => {
  console.log("deleting contemporary ID");
  Weapon.findOneAndDelete({ _id: req.params.id }, (err, deletedItem) => {});
  res.redirect("/weapons/contemporaries");
};

module.exports = {
  index,
  show,
  delete: deleteWars
};
