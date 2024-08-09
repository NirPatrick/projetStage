const express = require('express')
const router = express.Router()
const etablissementController = require('../controllers/etablissement.controller')

router.post('/', etablissementController.createEtablissement)
router.get('/', etablissementController.getEtablissements)
router.get('/:id', etablissementController.getEtablissementById)
router.put('/:id', etablissementController.updateEtablissement)
router.delete('/:id', etablissementController.deleteEtablissement)

module.exports = router
