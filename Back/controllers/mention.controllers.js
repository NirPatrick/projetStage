const Mention = require('../models/mention.model')

// Créer une nouvelle mention
exports.createMention = async (req, res) => {
  try {
    const { Nom, id_etablissement,matiere, langue_d_enseignement, capaciter_d_accueil } = req.body
    const newMention = new Mention({ Nom, id_etablissement,matiere, langue_d_enseignement, capaciter_d_accueil })
    await newMention.save()
    res.status(201).json(newMention)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Obtenir toutes les mentions
exports.getMentions = async (req, res) => {
  try {
    const mentions = await Mention.find().populate('id_etablissement')
    res.status(200).json(mentions)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Obtenir une mention par ID
exports.getMentionById = async (req, res) => {
  try {
    const mention = await Mention.findById(req.params.id).populate('id_etablissement')
    if (!mention) return res.status(404).json({ message: 'Mention non trouvée' })
    res.status(200).json(mention)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Mettre à jour une mention
exports.updateMention = async (req, res) => {
  try {
    const { Nom, id_etablissement, langue_d_enseignement, capaciter_d_accueil } = req.body
    const updatedMention = await Mention.findByIdAndUpdate(req.params.id, { Nom, id_etablissement,matiere, langue_d_enseignement, capaciter_d_accueil }, { new: true })
    if (!updatedMention) return res.status(404).json({ message: 'Mention non trouvée' })
    res.status(200).json(updatedMention)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Supprimer une mention
exports.deleteMention = async (req, res) => {
  try {
    const deletedMention = await Mention.findByIdAndDelete(req.params.id)
    if (!deletedMention) return res.status(404).json({ message: 'Mention non trouvée' })
    res.status(200).json({ message: 'Mention supprimée avec succès' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
