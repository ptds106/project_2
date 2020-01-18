const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const casualtySchema = new Schema({
  casualties: {type: Number, default: 'needs updates'}
  },
  );

const historiesSchema = new Schema({
  region: { type: String, default: 'needs updates'},
  involvedStates: { type: String, default: 'needs updates' },
  date: {
    type: String,
    default: function() {
      return Number(new Date().getFullYear()) + 1;
    }
  },
  win: { type: String, default: 'needs updates'}, 
  casualties: {casualtySchema} ,
  weapon: [{type: Schema.Types.ObjectId, ref: 'Weapon'}]
});

module.exports = mongoose.model("History", historiesSchema);

