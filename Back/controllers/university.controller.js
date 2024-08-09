// controllers/universityController.js
const University = require('../models/university.model')

exports.createUniversity = async (req, res) => {
    try {
        const { nomAdmin, email,password, lieu, latitude, longitude, Nom_Univ, logo, text } = req.body
        const newUniversity = new University({nomAdmin,email,password, lieu, latitude, longitude, Nom_Univ, logo, text })
        await newUniversity.save()
        res.status(201).json(newUniversity)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

exports.getUniversities = async (req, res) => {
    try {
        const universities = await University.find()
        res.status(200).json(universities)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

exports.getUniversityById = async (req, res) => {
    try {
        const university = await University.findById(req.params.id)
        if (!university) return res.status(404).json({ error: 'University not found' })
        res.status(200).json(university)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

exports.updateUniversity = async (req, res) => {
    try {
        const updatedUniversity = await University.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!updatedUniversity) return res.status(404).json({ error: 'University not found' })
        res.status(200).json(updatedUniversity)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

exports.deleteUniversity = async (req, res) => {
    try {
        const deletedUniversity = await University.findByIdAndDelete(req.params.id)
        if (!deletedUniversity) return res.status(404).json({ error: 'University not found' })
        res.status(200).json({ message: 'University deleted' })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}
