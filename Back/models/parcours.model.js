const mongoose = require('mongoose')

const ParcoursSchema = new mongoose.Schema({
  id_mention: { type: mongoose.Schema.Types.ObjectId, ref: 'Mention', required: true },
  dure_etude: { type: Number, required: true },
  condition_d_access: { type: String, required: true },
  debouche: { type: String, required: true },
  vocation: { type: String, required: true }
})

module.exports = mongoose.model('Parcours', ParcoursSchema)
