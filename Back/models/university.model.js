// models/University.js
const mongoose = require('mongoose')

const UniversitySchema = new mongoose.Schema({
    nomAdmin: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    lieu: {
        type: String,
        required: true,
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    Nom_Univ: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('University', UniversitySchema)
