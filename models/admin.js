const mongoose = require('mongoose')

const adminSchema = mongoose.Schema(
    {
        TenAdmin: {
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

const admin =mongoose.model('Admin', adminSchema);
module.exports = admin