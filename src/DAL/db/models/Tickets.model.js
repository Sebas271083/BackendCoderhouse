import mongoose from "mongoose";

const TicketSchema = mongoose.Schema({
    code:{
        unique:true,
        type:String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
      },
      amount:{
        type:Number
      },
      emailUsuario:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users' // Nombre del modelo de usuario
      }
})

export const Ticket = mongoose.model('Ticket', TicketSchema)