const History = require("../../models/history");
var User = require("../../models/user");
var Comment = require("../../models/comment");
var Weapon = require("../../models/weapon");

const index = (req, res) => {
  History.find({}, (err, war) => {
    if (err) {
      res.render("error");
    }
    const sortedWars = war.sort((a, b) => (a.dateFrom > b.dateFrom) ? 1 : -1)
    res.render("histories/wars/contemporaries", {
      warsSorted: sortedWars,
      id: req.params.id,
      user: req.user,
      name: req.query.name,
      histories: war,
    });
  });
}
const show = (req, res) => {
  History.findById(req.params.id)
    .populate("weapon")
    .exec((err, histories) => {
      Comment.find({}, (err, comments) => {
        Weapon.find({ _id: { $nin: histories.weapon } }).exec((err, weapons) => {
          res.render("histories/wars/contemporaries-show", {
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

function addComments(req, res, next) {
  const comment = new Comment(req.body);
  comment.save(err => {
    if (err) res.redirect("error");
    req.user.comments.push(comment);
    History.findById(req.params.id, (err, histories) => {
      req.user.save(function(err) {
        histories.comments.push(comment);
        histories.save();
        res.redirect(`/contemporaries/${req.params.id}`);
      });
    });
  });
}
const deleteWars = (req, res) => {
  History.find({ comments: req.params.id }, (err, histories) => {
  
    let array = histories[0].comments;
    array.splice(array.indexOf(req.params.id), 1);
    histories[0].save();

    User.findById(req.user).exec((err, user) => {
      user.comments.splice(user.comments.indexOf(req.params.id), 1);
      user.save();
    });
    Comment.findOneAndDelete({ _id: req.params.id }, (err, deletedItem) => {});
    res.redirect(`/contemporaries/${histories[0].id}`);
  });
};
module.exports = {
  index,
  show,
  addComments,
  delete: deleteWars,
};
