const History = require("../../models/history");
var User = require("../../models/user");
var Comment = require("../../models/comment");
const index = (req, res) => {
  History.find({}, (err, war) => {
    if (err) {
      res.render("error");
    }
    const sortedWars = war.sort((a, b) => (a.dateFrom > b.dateFrom) ? 1 : -1)
    res.render("histories/wars/medivals", {
      warsSorted: sortedWars,
      id: req.params.id,
      user: req.user,
      name: req.query.name,
      histories: war,
    });
  });
}

const show = (req, res) => {
  History.findById(req.params.id, (err, history) => {
    Comment.find({}, (err, comments) => {
      res.render("histories/wars/medivals-show", {
        history,
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
    History.findById(req.params.id, (err, history) => {
      req.user.save(function(err) {
        history.comments.push(comment);
        history.save();
        res.redirect(`/medivals/${req.params.id}`);
      });
    });
  });
}
const deleteWars = (req, res) => {
  History.find({ comments: req.params.id }, (err, history) => {
  
    let array = history[0].comments;
    array.splice(array.indexOf(req.params.id), 1);
    history[0].save();

    User.findById(req.user).exec((err, user) => {
      user.comments.splice(user.comments.indexOf(req.params.id), 1);
      user.save();
    });
    Comment.findOneAndDelete({ _id: req.params.id }, (err, deletedItem) => {});
    res.redirect(`/medivals/${history[0].id}`);
  });
};
module.exports = {
  index,
  show,
  addComments,
  delete: deleteWars,
};

