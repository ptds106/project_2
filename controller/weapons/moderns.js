var Weapon = require("../../models/weapon");
var User = require("../../models/user");
var Comment = require("../../models/comment");

const index = (req, res) => {
  Weapon.find({}, (err, weapons) => {
    if (err) {
      res.render("error");
    }
    const sortedWeapons = weapons.sort((a, b) =>
      a.weaponYear > b.weaponYear ? 1 : -1
    );
    res.render("histories/weapons/moderns", {
      weaponsSorted: sortedWeapons,
      id: req.params.id,
      user: req.user,
      name: req.query.name,
      histories: weapons
    });
  });
};
const show = (req, res) => {
  Weapon.findById(req.params.id, (err, weapons) => {
    Comment.find({}, (err, comments) => {
      res.render("histories/weapons/moderns-show", {
        weapons,
        id: req.params.id,
        user: req.user,
        name: req.query.name,
        comments
      });
    });
  });
};

function addComments(req, res, next) {
  const comment = new Comment(req.body);
  comment.save(err => {
    if (err) res.redirect("error");
    req.user.comments.push(comment);
    Weapon.findById(req.params.id, (err, weapons) => {
      req.user.save(function(err) {
        weapons.comments.push(comment);
        weapons.save();
        res.redirect(`/weapons/moderns/${req.params.id}`);
      });
    });
  });
}
const deleteWars = (req, res) => {
  Weapon.find({ comments: req.params.id }, (err, weapons) => {
    let array = weapons[0].comments;
    array.splice(array.indexOf(req.params.id), 1);
    weapons[0].save();

    User.findById(req.user).exec((err, user) => {
      user.comments.splice(user.comments.indexOf(req.params.id), 1);
      user.save();
    });
    Comment.findOneAndDelete({ _id: req.params.id }, (err, deletedItem) => {});
    res.redirect(`/weapons/moderns/${weapons[0].id}`);
  });
};
module.exports = {
  index,
  show,
  addComments,
  delete: deleteWars
};
