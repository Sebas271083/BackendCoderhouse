import { Ticket } from '../db/models/Tickets.model.js'
import Users from '../db/models/Users.model.js'


export class ManagerTicket {
    async getAll() {
        try {
            const tickets = await Ticket.find().populate('emailUsuario')
            return tickets
        } catch (error) {
            return error
        }
    }

    async getOne(idTicket) {
        console.log(idTicket + " idTicket")
        try {
            const ticket = await Ticket.findOne({ _id: idTicket }).populate('emailUsuario')
            console.log("Ticket en el manager", ticket)
            return ticket
        } catch (error) {
            return error
        }
    }

    async addTicket(obj) {
        try {
            const existingTicket = await Ticket.findOne({ code: obj.code });

            if (existingTicket) {
                // Si ya existe un ticket con el mismo código, devuelve un mensaje de error o realiza alguna acción apropiada
                return { error: 'Ticket already exists' };
            }
            const user = await Users.findOne({ email: obj.emailUsuario })

            if (!user) {
                return 'El Usuario no existe'
            }

            console.log(obj)
            const newTicket = Ticket.create({ ...obj, emailUsuario: user._id })
            return newTicket
        } catch (error) {
            return error
        }
    }
    // async updateOne(){

    // }

    // async deleteOne(){

    // }
}