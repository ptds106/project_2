const History = require("../models/history");
var weapon = require("../models/weapon");

const index = (req, res) => {
  History.find({}, (err, war) => {
    if (err) {
      res.render("error");
    }
    const sortedWars = war.sort((a, b) => (a.dateFrom > b.dateFrom) ? 1 : -1)
    res.render("histories/wars/moderns", {
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
        res.render('histories/wars/moderns-show', { 
          history,
          user: req.user,
          name: req.query.name
        });
      });
};
const deleteWars = (req, res) => {
  console.log('deleting contemporary ID')
  History.findOneAndDelete({ _id: req.params.id }, (err, deletedItem) => {});
  res.redirect("/moderns");
};

module.exports = {
  index,
  show,
  delete: deleteWars,
};
