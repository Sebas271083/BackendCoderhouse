import { ManagerTicket } from "../DAL/DAOs/managerTicket.js";

const managerTicket = new ManagerTicket()

export const getAllTickets = async()=>{
    try {
        const tickets = managerTicket.getAll()
        return tickets
    } catch (error) {
        console.log(error)
    }
}

export const getOneTicket = async(id)=>{
    try {
        const ticket = await managerTicket.getOne(id)
        return ticket
    } catch (error) {
        console.log(error)
    }
}


export const addTicket = async(obj)=>{
    try {
        const newTicket = await managerTicket.addTicket(obj)
        return newTicket
    } catch (error) {
        console.log(error)
    }
}