const mongoose = require('mongoose')

const NVSchema = mongoose.Schema(
    {
        TenNV: {
            type: String,
            required: [true, "Please enter your name"]
        },
        SDT: {
            type: String,
            required: true,
            default: 0
        },
        Matkhau:{
            type:String,
            require:true,
        },
    },
    {
        timestamps: true,
    }
)

const nhanvien =mongoose.model('Nhanvien', NVSchema);
module.exports = nhanvien