const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
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

    const products =mongoose.model('Products', productSchema);
    module.exports = products