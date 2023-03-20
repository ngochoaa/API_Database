const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        TenKH: {
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
        Gioitinh:{
            type: String,
            require:true
        },
        Ngaysinh:{
            type: String,
            require:true
        }
    },
    {
        timestamps: true,
    }
)

const user =mongoose.model('Users', userSchema);
module.exports = user