const express = require('express')
const router = express.Router()
const mentionController = require('../controllers/mention.controllers')

router.post('/', mentionController.createMention)
router.get('/', mentionController.getMentions)
router.get('/:id', mentionController.getMentionById)
router.put('/:id', mentionController.updateMention)
router.delete('/:id', mentionController.deleteMention)

module.exports = router
