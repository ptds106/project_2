const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const winSchema = new Schema({
  winCountry: {type: String,}
  },
  );

const warsSchema = new Schema({
  region: { type: String, enum: ['Americas', 'Europe', 'Asia','Africa', 'Middle-East']},
  involvedCountries: { type: String, enum: ["American", "Southwest", "United"] },
  date: {
    type: String,
    default: function() {
      return Number(new Date().getFullYear()) + 1;
    }
  },
  win: {winSchema} ,
  ticket: [{type: Schema.Types.ObjectId, ref: 'Ticket'}]
});

module.exports = mongoose.model("Flight", warsSchema);

