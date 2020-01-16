const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const weaponsSchema = new Schema({
  weapons: {type: String, required: true, unique: true,
  },

},);

module.exports = mongoose.model('Ticket', weaponsSchema);