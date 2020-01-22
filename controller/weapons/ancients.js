var Weapon = require("../../models/weapon");
var User = require("../../models/user");
var Comment = require("../../models/comment");

const index = (req, res) => {
  Weapon.find({}, (err, weapon) => {
    if (err) {
      res.render("error");
    }
    const sortedWeapons = weapon.sort((a, b) =>
      a.weaponYear > b.weaponYear ? 1 : -1
    );
    res.render("histories/weapons/ancients", {
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
    Comment.find({}, (err, comments) => {
      res.render("histories/weapons/ancients-show", {
        weapon,
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
    Weapon.findById(req.params.id, (err, weapon) => {
      req.user.save(function(err) {
        weapon.comments.push(comment);
        weapon.save();
        res.redirect(`/weapons/ancients/${req.params.id}`);
      });
    });
  });
}
const deleteWars = (req, res) => {
  Weapon.find({ comments: req.params.id }, (err, weapon) => {
    let array = weapon[0].comments;
    array.splice(array.indexOf(req.params.id), 1);
    weapon[0].save();

    User.findById(req.user).exec((err, user) => {
      user.comments.splice(user.comments.indexOf(req.params.id), 1);
      user.save();
    });
    Comment.findOneAndDelete({ _id: req.params.id }, (err, deletedItem) => {});
    res.redirect(`/weapon/ancients/${weapon[0].id}`);
  });
};
module.exports = {
  index,
  show,
  addComments,
  delete: deleteWars
};
