
import mongoose, { Schema } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const productsSchema = new Schema({
    title:{
        type:String,
        require:true
    },
    description: {
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true  
    },
    code: {
        type:String,
        require:true
    },
    stock:{
        type:Number,
        require:true
    },
    img: {
        type:String
    }
})

productsSchema.plugin(mongoosePaginate)
export const productsModel = mongoose.model('products', productsSchema)
