const History = require("../../models/history");
var weapon = require("../../models/weapon");

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
  console.log("you are in show")
  History.findById(req.params.id, (err, history) => {
        res.render('histories/wars/medivals-show', { 
          history,
          user: req.user,
          name: req.query.name
        });
      });
};
const deleteWars = (req, res) => {
  History.findOneAndDelete({ _id: req.params.id }, (err, deletedItem) => {});
  res.redirect("/medivals");
};
module.exports = {
  index,
  show,
  delete: deleteWars,
};
