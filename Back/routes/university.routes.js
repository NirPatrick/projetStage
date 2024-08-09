// routes/universityRoutes.js
const express = require('express')
const router = express.Router()
const universityController = require('../controllers/university.controller')

router.post('/', universityController.createUniversity)
router.get('/', universityController.getUniversities)
router.get('/:id', universityController.getUniversityById)
router.put('/:id', universityController.updateUniversity)
router.delete('/:id', universityController.deleteUniversity)

module.exports = router
