const mongoose = require('mongoose')

const HoadonSchema = mongoose.Schema(
    {
        TenSP: {
            type: String,
            required: [true, "Please enter name"]
        },
        Soluong: {
            type: String,
            required: true,
            default: 0
        },
        Thanhtien:{
            type:String,
            require:true,
        },
        GiaSP:{
            type:String,
            require:true,
        },
    },
    {
        timestamps: true,
    }
)

const hoadon =mongoose.model('Hoadon', HoadonSchema);
module.exports = hoadon