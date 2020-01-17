const histories = require("../models/history");
var weapon = require('../models/weapon')

const index = (req, res) => {
    res.render('histories/moderns', { 
        histories, 
        user: req.user,
        name: req.query.name
    })
    }
  
  
  
module.exports = {
    index,
    // show,

  };