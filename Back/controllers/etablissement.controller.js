const Etablissement = require('../models/etablissement.model')

// Créer un nouvel établissement
exports.createEtablissement = async (req, res) => {
  try {
    const { lieu, id_University, Nom, logo } = req.body
    const newEtablissement = new Etablissement({ lieu, id_University, Nom, logo })
    await newEtablissement.save()
    res.status(201).json(newEtablissement)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Obtenir tous les établissements
exports.getEtablissements = async (req, res) => {
  try {
    const etablissements = await Etablissement.find().populate('id_University')
    res.status(200).json(etablissements)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Obtenir un établissement par ID
exports.getEtablissementById = async (req, res) => {
  try {
    const etablissement = await Etablissement.findById(req.params.id).populate('id_University')
    if (!etablissement) return res.status(404).json({ message: 'Etablissement non trouvé' })
    res.status(200).json(etablissement)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Mettre à jour un établissement
exports.updateEtablissement = async (req, res) => {
  try {
    const { lieu, id_University, Nom, logo } = req.body
    const updatedEtablissement = await Etablissement.findByIdAndUpdate(req.params.id, { lieu, id_University, Nom, logo }, { new: true })
    if (!updatedEtablissement) return res.status(404).json({ message: 'Etablissement non trouvé' })
    res.status(200).json(updatedEtablissement)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Supprimer un établissement
exports.deleteEtablissement = async (req, res) => {
  try {
    const deletedEtablissement = await Etablissement.findByIdAndDelete(req.params.id)
    if (!deletedEtablissement) return res.status(404).json({ message: 'Etablissement non trouvé' })
    res.status(200).json({ message: 'Etablissement supprimé avec succès' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
