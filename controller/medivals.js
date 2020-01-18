const histories = require("../models/history");
var weapon = require("../models/weapon");

const index = (req, res) => {
  res.render("histories/wars/medivals", {
    histories,
    user: req.user,
    name: req.query.name
  });
};

module.exports = {
  index
  // show,
};
