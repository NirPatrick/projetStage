const User = require('../models/user.model')

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const createUser = async (req, res) => {
    const { nom_prenom, email, role } = req.body

    try {
        const user = new User({ nom_prenom, email, role })
        await user.save()
        res.status(201).json(user)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = { getAllUsers, createUser }
