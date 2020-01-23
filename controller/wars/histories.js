var User = require("../../models/user");
const History = require("../../models/history");
var Weapon = require("../../models/weapon");
var Comment = require("../../models/comment");

const newWar = (req, res) => {
  History.find({}, (err, war) => {
    if (err) {
      res.render("error");
    }
    res.render("histories/crud/add-wars", {
      id: req.params.id,
      user: req.user,
      name: req.query.name,
      histories: war
    });
  });
};
const index = (req, res) => {
  History.find({}, (err, war) => {
    if (err) {
      res.render("error");
    }
    const sortedWars = war.sort((a, b) => (a.dateFrom > b.dateFrom ? 1 : -1));
    res.render("index", {
      warsSorted: sortedWars,
      id: req.params.id,
      user: req.user,
      name: req.query.name,
      histories: war
    });
  });
};
const indexView = (req, res) => {
  History.find({}, (err, war) => {
    if (err) {
      res.render("error");
    }
    const sortedWars = war.sort((a, b) => (a.dateFrom > b.dateFrom ? 1 : -1));
    res.render("histories/wars/histories", {
      warsSorted: sortedWars,
      id: req.params.id,
      user: req.user,
      name: req.query.name,
      histories: war
    });
  });
};

const show = (req, res) => {
  History.findById(req.params.id)
    .populate("weapon")
    .exec((err, histories) => {
      Comment.find({}, (err, comments) => {
        Weapon.find({ _id: { $nin: histories.weapon } }).exec((err, weapons) => {
          res.render("histories/wars/histories-show", {
            histories,
            id: req.params.id,
            user: req.user,
            name: req.query.name,
            comments,
            weapons
          });
        });
      }); 
    });
};

const create = (req, res) => {
  const createWar = new History(req.body);
  createWar.save(err => {
    req.user.history.push(createWar);
    req.user.save();
    if (err) return res.redirect("error");
    res.redirect("/histories/views");
  });
};

const deleteWars = (req, res) => {
  History.find({}, (err, history) => {
    User.findById(req.user).exec((err, user) => {
      history.forEach((h, idx) => {
        if (h._id == req.params.id) {
          h.comments.forEach((c, idx) => {
            Comment.findOneAndDelete({ _id: c }, (err, deletedItem) => {});
            user.comments.splice(user.comments.indexOf(c), 1);
            user.history.splice(user.history.indexOf(req.params.id), 1);
            user.save();
          });
        }
      });
    });
    History.findOneAndDelete({ _id: req.params.id }, (err, deletedItem) => {});
  });
  res.redirect("/histories/views");
};

const edit = (req, res) => {
  History.findById(req.params.id, (err, histories) => {
    res.render("histories/crud/edit-wars", {
      histories,
      id: req.params.id,
      user: req.user,
      name: req.query.name
    });
  });
};

const update = (req, res) => {
  History.findByIdAndUpdate(req.params.id, req.body, (err, flight) => {
    if (err) return res.status(500).send(err);
    res.redirect("/histories/views");
  });
};
const addToWeapon = (req, res) => {
  Weapon.findById(req.params.id, (err, weapons) => {
     weapons.history.push(req.body.history);
    weapons.save(err => {
      res.redirect(`/weapons/${weapons._id}`)
    })
  })
}
module.exports = {
  index,
  indexView,
  create,
  show,
  new: newWar,
  delete: deleteWars,
  edit,
  update,
  addToWeapon,
};
