const express = require('express')
const router = express.Router()
const parcoursController = require('../controllers/parcours.controller')

router.post('/', parcoursController.createParcours)
router.get('/', parcoursController.getParcours)
router.get('/:id', parcoursController.getParcoursById)
router.put('/:id', parcoursController.updateParcours)
router.delete('/:id', parcoursController.deleteParcours)

module.exports = router
