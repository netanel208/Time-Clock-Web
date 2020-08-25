const express = require('express')

const ShiftCtrl = require('../controllers/shift-ctrl')

const router = express.Router()

router.post('/shifts/start', ShiftCtrl.startShift)
router.get('/shifts', ShiftCtrl.getShifts)
router.put('/shifts/stop/:id', ShiftCtrl.updateShift)
router.get('/shifts/:id', ShiftCtrl.getShiftsByUserId)

module.exports = router