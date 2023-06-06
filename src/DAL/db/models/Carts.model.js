


import mongoose, { Schema } from "mongoose";

const cartsSchema = new Schema({

    product: [{
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'products'
        },
        quantity: {
          type: Number,
          default: 1
        }
      }],
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }]

});


export const cartsModel = mongoose.model('carts', cartsSchema);