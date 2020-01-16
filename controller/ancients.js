const histories = require("../models/history");
var weapon = require('../models/weapon')

const index = (req, res) => {
    res.render("histories/ancients")
}

  
  
module.exports = {
    index,
    // show,

  };