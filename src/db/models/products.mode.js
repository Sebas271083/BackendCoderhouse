
import mongoose, { Schema } from "mongoose";

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
    }
})

export const productsModel = mongoose.model('products', productsSchema)
