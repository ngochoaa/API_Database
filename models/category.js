const mongoose = require('mongoose')

const categorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter name"]
        },
        products:[{
            type: mongoose.Schema.Types.ObjectId,
            ref:"SanPham"
        }]
    },
    {
        timestamps: true,
    }
)

const category =mongoose.model('Category', categorySchema);
module.exports = category