import { UsersManager } from "../DAL/DAOs/managerUsers.js";


const usersManager = new UsersManager()

export const getAllProducts = async()=>{
    try {
        const users = usersManager.getAll()
        return users
    } catch (error) {
        console.log(error)
    }
}