import mongoose, { Schema } from "mongoose";

const cartsSchema = new Schema({
    products:{
        type:Array
    }
})

export const cartsModel = mongoose.model('students', cartsSchema)