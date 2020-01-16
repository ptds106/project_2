const histories = require("../models/history");
var weapon = require('../models/weapon')

const index = (req, res) => {
    res.render("histories/moderns")
}

  
  
module.exports = {
    index,
    // show,

  };