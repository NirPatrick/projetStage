// models/Mention.js
const mongoose = require('mongoose')

const MentionSchema = new mongoose.Schema({
  Nom: { type: String, required: true },
  id_etablissement: { type: mongoose.Schema.Types.ObjectId, ref: 'Etablissement', required: true },
  matiere: { type: String, required: true },
  langue_d_enseignement: { type: String, required: true },
  capaciter_d_accueil: { type: Number, required: true }
})

module.exports = mongoose.model('Mention', MentionSchema)
