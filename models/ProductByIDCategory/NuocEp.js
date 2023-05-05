const mongoose = require('mongoose')

const NuocEpSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please enter your name"]
            },
            category: {
                type: String,
                required: true,
                default: 0
            },
            price   :{
                type:String,
                require:true,
            },
            description:{
                type:String,
                require:true
            },
            image:{
                type:String,
                required:true
            }
        },
        {
            timestamps: true,
        }
    )

    const nuocep =mongoose.model('NuocEp', NuocEpSchema);
    module.exports = nuocep