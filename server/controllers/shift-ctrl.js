const Shift = require('../models/shift-model')


startShift = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a shift',
        })
    }

    const shift = new Shift(body)

    if (!shift) {
        return res.status(400).json({ success: false, error: err })
    }

    shift
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: shift._id,
                message: 'Shift created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Shift not created!',
            })
        })
}


getShifts = async (req, res) => {
    await Shift.find({}, (err, shifts) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!shifts.length) {
            return res
                .status(404)
                .json({ success: false, error: `Shift not found` })
        }
        return res.status(200).json({ success: true, data: shifts })
    }).catch(err => console.log(err))
}


updateShift = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Shift.findOne({ _id: req.params.id }, (err, shift) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Shift not found!',
            })
        }
        shift.stop = body.stop;
        shift.status = body.status;
        shift
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: shift._id,
                    message: 'Shift updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Shift not updated!',
                })
            })
    })
}

getShiftsByUserId = async (req, res) => {
    await Shift.find({ user_id: req.params.id }, (err, shift) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!shift) {
            return res
                .status(404)
                .json({ success: false, error: `Shift not found` })
        }
        return res.status(200).json({ success: true, data: shift })
    }).catch(err => console.log(err))
}


module.exports = {
    startShift,
    getShifts,
    updateShift,
    getShiftsByUserId,
}