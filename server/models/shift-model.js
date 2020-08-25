const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Shift = new Schema(
    {
        user_id: {type: String, require: true},
        start: { type: Date, required: true },
        stop: { type: Date, required: false },
        status: {type: Number, require: true}
    },
    { timestamps: { createdAt: 'created_at' } }
)

module.exports = mongoose.model('shifts', Shift)