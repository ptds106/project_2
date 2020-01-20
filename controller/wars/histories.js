const History = require("../../models/history");
var weapon = require("../../models/weapon");

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

function index(req, res, next) {
  let modelQuery = req.query.name
    ? { name: new RegExp(req.query.name, "i") }
    : {};
  let sortKey = req.query.sort || "name";
  History.find(modelQuery)
    .sort(sortKey)
    .exec(function(err, histories) {
      if (err) return next(err);
      res.render("index", {
        histories,
        user: req.user,
        name: req.query.name,
        sortKey
      });
    });
}
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

const create = (req, res) => {
  console.log("this is create");
  const createWar = new History(req.body);
  createWar.save(err => {
    if (err) return res.redirect("histories/crud/add-wars");
    res.redirect("/histories");
  });
};
const deleteWars = (req, res) => {
  console.log("deleting contemporary ID");
  History.findOneAndDelete({ _id: req.params.id }, (err, deletedItem) => {});
  res.redirect("/histories");
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
  new: newWar,
  delete: deleteWars,
  edit,
  update
};
