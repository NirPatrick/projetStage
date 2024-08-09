const mongoose = require('mongoose')

const EtablissementSchema = new mongoose.Schema({
  lieu: { type: String, required: true },
  id_University: { type: mongoose.Schema.Types.ObjectId, ref: 'University', required: true },
  Nom: { type: String, required: true },
  logo: { type: String, required: true }
})

module.exports = mongoose.model('Etablissement', EtablissementSchema)
