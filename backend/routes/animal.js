const express = require ('express')
const router = express.Router()
const animalCtrl = require('../controllers/animal')

router.get('/', animalCtrl.findAll)
router.get('/:id', animalCtrl.findOne)
router.post('/', animalCtrl.create)

module.exports = router