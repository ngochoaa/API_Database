const mongoose = require('mongoose')

const tichdiemSchema = mongoose.Schema(
    {
        Diem: {
            type: String,
            required: [true, "Please enter your name"]
        },
        Diemdoi: {
            type: String,
            required: true,
            default: 0
        },
    },
    {
        timestamps: true,
    }
)

const tichdiem =mongoose.model('Tichdiem', tichdiemSchema);
module.exports = tichdiem