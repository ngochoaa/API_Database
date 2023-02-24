const mongoose = require('mongoose')

const feedbackSchema = mongoose.Schema(
    {
        Noidung: {
            type: String,
            required: [true, "Please enter your name"]
        },
        Diemtich: {
            type: String,
            required: true,
            default: 0
        },
    },
    {
        timestamps: true,
    }
)

const feedback =mongoose.model('Feedback', feedbackSchema);
module.exports = feedback