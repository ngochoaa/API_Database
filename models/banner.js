const mongoose = require('mongoose')

const bannerSchema = mongoose.Schema(
    {
        name:{
            type: String,
        },
        images:{
            type: String
        },
        decription:{
            type: String,
        }
    },
    {
        timestamps: true,
    }
)

const banner =mongoose.model('Banner', bannerSchema);
module.exports = banner