const mongoose = require('mongoose')

const HoadonSchema = mongoose.Schema(
    {
        TenHoaDon: {
            type: String,
            default: "Hóa Đơn CoCoTea",
        },
        
        creationDate: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
    }
)

const hoadon =mongoose.model('Hoadon', HoadonSchema);
module.exports = hoadon