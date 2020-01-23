var User = require("../../models/user");
const Weapon = require("../../models/weapon");
const History = require("../../models/history");
var Comment = require("../../models/comment");

const newWeapons = (req, res) => {
  Weapon.find({}, (err, weapon) => {
    if (err) {
      res.render("error");
    }
    res.render("histories/crud/add-weapons", {
      id: req.params.id,
      user: req.user,
      name: req.query.name,
      histories: weapon,
    });
  });
};
const index = (req, res) => {
  Weapon.find({}, (err, weapons) => {
    if (err) {
      res.render("error");
    }
    const sortedWeapons = weapon.sort((a, b) => (a.weaponOriginRegion > b.weaponOriginRegion ? 1 : -1));
    res.render("index", {
      weaponsSorted: sortedWeapons,
      id: req.params.id,
      user: req.user,
      name: req.query.name,
      histories: weapons
    });
  });
};
const indexView = (req, res) => {
  Weapon.find({}, (err, weapons) => {
    if (err) {
      res.render("error");
    }
    const sortedWeapons = weapons.sort((a, b) => (a.weaponOriginRegion > b.weaponOriginRegion ? 1 : -1));
    res.render("histories/weapons/histories", {
      weaponSorted: sortedWeapons,
      id: req.params.id,
      user: req.user,
      name: req.query.name,
      histories: weapons,
    });
  });
};
const show = (req, res) => {
  Weapon.findById(req.params.id, (err, weapons) => {
    Comment.find({}, (err, comments) => {
      res.render("histories/weapons/histories-show", {
        weapons,
        id: req.params.id,
        user: req.user,
        name: req.query.name,
        comments
      });
    });
  });
};
const create = (req, res) => {
  const createWeapon = new Weapon(req.body);
  createWeapon.save(err => {
    req.user.weapons.push(createWeapon);
    req.user.save();
    if (err) return res.redirect("error");
    res.redirect("/weapons/views");
  });
};

const deleteWeapons = (req, res) => {
  Weapon.find({}, (err, weapons) => {
    User.findById(req.user).exec((err, user) => {
      weapons.forEach((h, idx) => {
        if (h._id == req.params.id) {
          h.comments.forEach((c, idx) => {
            Comment.findOneAndDelete({ _id: c }, (err, deletedItem) => {});
            user.comments.splice(user.comments.indexOf(c), 1);
            user.weapons.splice(user.weapons.indexOf(req.params.id), 1);
            user.save();
          });
        }
      });
    });
    Weapon.findOneAndDelete({ _id: req.params.id }, (err, deletedItem) => {});
  });
  res.redirect("/weapons/views");
};

const edit = (req, res) => {
  Weapon.findById(req.params.id, (err, weapons) => {
    res.render("histories/crud/edit-weapons", {
      histories: weapons,
      id: req.params.id,
      user: req.user,
      name: req.query.name
    });
  });
};

const update = (req, res) => {
  Weapon.findByIdAndUpdate(req.params.id, req.body, (err, weapon) => {
    if (err) return res.status(500).send(err);
    res.redirect("/weapons/views");
  });
};
const addToHistory = (req, res) => {
  History.findById(req.params.id, (err, history) => {
     history.weapons.push(req.body.seats);
    history.save(err => {
      res.redirect(`/histories/${history._id}`)
    })
  })
}
module.exports = {
  index,
  indexView,
  create,
  show,
  new: newWeapons,
  delete: deleteWeapons,
  edit,
  update,
  addToHistory,
};
