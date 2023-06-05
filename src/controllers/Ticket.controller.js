import {addTicket, getAllTickets, getOneTicket} from '../service/Tickets.service.js'


export const findAllTickets = async (req, res)=>{
    try {
        const tickets = await getAllTickets()
        if(tickets.length){
            res.status(200).json({message:"tickets found", tickets})
        } else {
            res.status(200).json({message:"No tickets"})
        }
    } catch (error) {
        res.status(200).json({message:"No Products"})
    }
}

export const findOneTicket = async (req, res)=>{

    const {idTicket} = req.params
    console.log(req.params)
    try {
        const ticket = await getOneTicket(idTicket)
        console.log(ticket)
        if(!ticket){
            res.status(200).json({message:'No product'})
        } else{
            res.status(200).json({message:"ticket found", ticket})
        }
    } catch (error) {
        res.status(200).json({message:"No Products"})
    }
}



export const createTicket = async(req, res)=>{
    const {code, amount, emailUsuario} = req.body
    if(!code || !amount || !emailUsuario) {
        res.status(400).json({message: 'Data missing'})
    }
    try {
        const newTicket = await addTicket(req.body)
        res.status(200).json({message: 'ticket Created', Ticket: newTicket})
    } catch (error) {
        console.log(error)
    }
}