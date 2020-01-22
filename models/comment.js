const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentsSchema = new Schema({
  comments: {type: String},
});


module.exports = mongoose.model("Comment", commentsSchema);

