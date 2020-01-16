const histories = require("../models/history");
var weapon = require('../models/weapon')

const newhistories = (req, res) => {
  res.render("histories/new");
};
const index = (req, res) => {
    res.render("histories/index")
}
const show = (req, res) => {
    histories.findById(req.params.id)
      .populate('weapon')
      .exec((err, histories) => {
        weapon.find({ _id: { $nin: histories.weapon } }).exec((err, weapons) => {
          res.render('histories/show', {
            title: 'histories Detail',
            histories,
            weapons,
          })
        })
      })
  }
const edit = (req, res) => {
  histories.findById(req.params.id, (err, histories) => {
    res.render("histories/edit", {
      title: "histories Edit",
      histories,
      id: req.params.id
    });
  });
};


const create = (req, res) => {
   console.log(req.body)
  const histories = new histories(req.body);
  histories.save(err => {
    if (err) return res.redirect("histories/new");
    res.redirect("/histories");
  });
};

const deletehistories = (req, res) => {
   histories.findOneAndDelete({'_id': req.params.id},(err, deletedItem) =>{

   })
      res.redirect("/histories")
  }
  // )}

const update = (req, res) => {
  console.log(req.body)
    histories.findByIdAndUpdate(req.params.id, req.body,{new:true}, (err, histories) => {
    if(err) return res.status(500).send(err);

      res.redirect(`/histories/${req.params.id}`);
  }
)}

module.exports = {
  new: newhistories,
  create,
  index,
  show,
  edit,
  update,
  delete: deletehistories,
};
