const express = require('express')
const router = express.Router()
const { createOffer, updateOffer, updateOfferStatus, deleteOffer, checkCapacity } = require('../controller/index')


router.post('/add', createOffer)
router.patch('/update/:id', updateOffer)
router.patch('/updateStatus/:id', updateOfferStatus)
router.delete('/delete/:id', deleteOffer)
router.get('/checkCapacity/:date', checkCapacity)

module.exports = router