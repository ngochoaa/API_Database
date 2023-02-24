const mongoose = require('mongoose')

const sanphamSchema = mongoose.Schema(
    {
        TenSP: {
            type: String,
            required: [true, "Please enter your name"]
        },
        LoaiSP: {
            type: String,
            required: true,
            default: 0
        },
        GiaSP:{
            type:String,
            require:true,
        },
        Description:{
            type:String,
            require:true
        },
        HinhSP:{
            type:String,
            required:true
        }
    },
    {
        timestamps: true,
    }
)

const sanpham =mongoose.model('SanPham', sanphamSchema);
module.exports = sanpham