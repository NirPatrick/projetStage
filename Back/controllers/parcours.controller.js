const Parcours = require('../models/parcours.model')

// Créer un nouveau parcours
exports.createParcours = async (req, res) => {
  try {
    const { id_mention, dure_etude, condition_d_access, debouche, vocation } = req.body
    const newParcours = new Parcours({ id_mention, dure_etude, condition_d_access, debouche, vocation })
    await newParcours.save()
    res.status(201).json(newParcours)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Obtenir tous les parcours
exports.getParcours = async (req, res) => {
  try {
    const parcours = await Parcours.find().populate('id_mention')
    res.status(200).json(parcours)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Obtenir un parcours par ID
exports.getParcoursById = async (req, res) => {
  try {
    const parcours = await Parcours.findById(req.params.id).populate('id_mention')
    if (!parcours) return res.status(404).json({ message: 'Parcours non trouvé' })
    res.status(200).json(parcours)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Mettre à jour un parcours
exports.updateParcours = async (req, res) => {
  try {
    const { id_mention, dure_etude, condition_d_access, debouche, vocation } = req.body
    const updatedParcours = await Parcours.findByIdAndUpdate(req.params.id, { id_mention, dure_etude, condition_d_access, debouche, vocation }, { new: true })
    if (!updatedParcours) return res.status(404).json({ message: 'Parcours non trouvé' })
    res.status(200).json(updatedParcours)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Supprimer un parcours
exports.deleteParcours = async (req, res) => {
  try {
    const deletedParcours = await Parcours.findByIdAndDelete(req.params.id)
    if (!deletedParcours) return res.status(404).json({ message: 'Parcours non trouvé' })
    res.status(200).json({ message: 'Parcours supprimé avec succès' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
