const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const historiesSchema = new Schema({
  name: {type: String, default: 'needs updates'},
  region: { type: String, default: 'needs updates'},
  involvedStates1: { type: String, default: 'needs updates' },
  involvedStates2: { type: String, default: 'needs updates' },
  dateFrom: {
    type: String,
    default: function() {
      return Number(new Date().getFullYear()) + 1;
    }
  },
  dateTo: {
    type: String,
    default: function() {
      return Number(new Date().getFullYear()) + 1;
    }
  },
  facts: {type: String},
  comments: [{type: Schema.Types.ObjectId, ref: 'Comments'}],
  casualties: String,
  weapon: [{type: Schema.Types.ObjectId, ref: 'Weapon'}]
});

module.exports = mongoose.model("History", historiesSchema);

