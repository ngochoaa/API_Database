const mongoose = require('mongoose')

const TraSchema = mongoose.Schema(
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

    const tra =mongoose.model('Tra', TraSchema);
    module.exports = tra