const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const weaponsSchema = new Schema({
  weaponName: { type: String, required: true, unique: true },
  weaponType: { type: String, enum: ["melee", "range"] },
  weaponTypeName: { type: String },
  weaponOriginRegion: {
    type: String,
    enum: ["North America", "South America", "Europe", "Asia", "Africa"]
  },
  weaponYear: { type: Number},
  comments: [{type: String}],
  history: [{ type: Schema.Types.ObjectId, ref: "History" }]
});

module.exports = mongoose.model("Weapon", weaponsSchema);
