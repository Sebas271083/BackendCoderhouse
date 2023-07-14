import mongoose, { Schema } from "mongoose";

const nosotrosSchema = new Schema({
    parrafo1: {
        type:String,
        require:true
    },
    parrafo2: {
        type:String,
        require:true
    },
    parrafo3: {
        type:String,
        require:true
    },
    parrafo4: {
        type:String,
        require:true
    },
    equipo:{
        type:String,
        require:true  
    },
    mision: {
        type:String,
        require:true
    }
});

export const nosotrosModel = mongoose.model('nosotros', nosotrosSchema);