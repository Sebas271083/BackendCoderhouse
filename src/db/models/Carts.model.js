// import mongoose, { Schema } from "mongoose";

// const cartsSchema = new Schema({
//     products:{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'products'
//     }
// })

// export const cartsModel = mongoose.model('carts', cartsSchema)


import mongoose, { Schema } from "mongoose";

const cartsSchema = new Schema({
    product: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    }],

});


export const cartsModel = mongoose.model('carts', cartsSchema);