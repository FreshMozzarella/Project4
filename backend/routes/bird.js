const express = require ('express')
const router = express.Router()
const birdCtrl = require('../controllers/bird')

router.get('/', birdCtrl.findAll)
router.get('/:id', birdCtrl.findOne)
router.post('/', birdCtrl.create)

module.exports = router