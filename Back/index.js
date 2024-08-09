const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user.routes')
const universityRoutes = require('./routes/university.routes')
const etablissementRoutes = require('./routes/etablissement.routes')
const mentionRoutes = require('./routes/mention.routes')
const dbConfig = require('./config/db')
const cors =require("cors")
const app = express()

const PORT = process.env.PORT || 5000

dbConfig()
app.use(cors())
app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/universities', universityRoutes)
app.use('/api/etablissements', etablissementRoutes)
app.use('/api/mentions', mentionRoutes)
app.use('/api/parcours', mentionRoutes)


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
