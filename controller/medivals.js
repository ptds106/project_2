const histories = require("../models/history");
var weapon = require('../models/weapon')

const index = (req, res) => {
    res.render("histories/medivals")
}

  
  
module.exports = {
    index,
    // show,

  };