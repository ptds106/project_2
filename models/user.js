const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  id: {type: String},
  displayName: { type: String},
  name: { type: String},
});

module.exports = mongoose.model("user", usersSchema);

