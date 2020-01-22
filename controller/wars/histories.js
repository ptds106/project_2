var User = require("../../models/user");
const History = require("../../models/history");
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
  console.log(req.user.history);
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
  History.findById(req.params.id, (err, history) => {
    res.render("histories/wars/histories-show", {
      history,
      user: req.user,
      name: req.query.name
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
  History.find({ comments: req.params.id }, (err, history) => {
    let array = history[0].comments;
    array.splice(array.indexOf(req.params.id), 1);
    history[0].save();

    User.findById(req.user).exec((err, user) => {
      user.comments.splice(user.comments.indexOf(req.params.id), 1);
      user.history.splice(user.history.indexOf(req.params.id), 1);
      user.save();
    });
    Comment.findOneAndDelete({ _id: req.params.id }, (err, deletedItem) => {});
    res.redirect("/histories/views")
  });
};

const edit = (req, res) => {
  History.findById(req.params.id, (err, history) => {
    res.render("histories/crud/edit-wars", {
      histories: history,
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

module.exports = {
  index,
  indexView,
  create,
  show,
  new: newWar,
  delete: deleteWars,
  edit,
  update
};
