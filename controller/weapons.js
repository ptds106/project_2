var Weapon = require("../models/weapon");
var War = require("../models/history");

const addTowar = (req, res) => {
  console.log("this is seats: ", req.body.seats);
  war.findById(req.params.id, (err, war) => {
    war.weapon.push(req.body.seats);
    war.save(err => {
      res.redirect(`/wars/${war._id}`);
    });
  });
};
// const addToCast = (req, res) => {
//   Movie.findById(req.params.id, (err, movie) => {
//     movie.cast.push(req.body.performerId)
//     movie.save(err => {
//       res.redirect(`/movies/${movie._id}`)
//     })
//   })
// }

// const create = (req, res) => {3
//   var s = req.body.born
//   req.body.born = `${s.substr(5, 2)}-${s.substr(8, 2)}-${s.substr(0, 4)}`
//   weapon.create(req.body, (err, performer) => {
//     res.redirect('/weapons/new')
//   })
// }
const create = (req, res) => {
  console.log(req.body);
  var s = req.body.seat;
  weapon.create(req.body, (err, weapon) => {
    res.redirect("/wars");
  });
};

const newweapon = (req, res) => {
  weapon.find({}, (err, weapons) => {
    res.render("wars/weapons/new", {
      title: "Add weapons",
      weapons
    });
  });
};

module.exports = {
  new: newweapon,
  create,
  addTowar
};
