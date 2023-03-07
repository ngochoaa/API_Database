const mongoose = require('mongoose')

const categorySchema = mongoose.Schema(
    {
        Name: {
            type: String,
            required: [true, "Please enter name"]
        },
    },
    {
        timestamps: true,
    }
)

const category =mongoose.model('Category', categorySchema);
module.exports = category