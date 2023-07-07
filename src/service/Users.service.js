import { UsersManager } from "../DAL/DAOs/managerUsers.js";
import {generarJWT} from '../helpers/token.js'


const usersManager = new UsersManager()

export const getAllUsers = async()=>{
    try {
        const users = usersManager.getAll()
        return users
    } catch (error) {
        console.log(error)
    }
}


export const getUser = async(id)=>{
    try {
        const user = await usersManager.getUserById(id)
        return user
    } catch (error) {
        console.log(error)
    }
}

export const getUserByEmail = async(email)=>{
    try {
        const token = generarJWT({email})
        const user = await usersManager.getUserByEmail(email)
        await usersManager.updateUser(user._id, token)
        const userActualizado = await usersManager.getUserByEmail(email) 

        console.log("USEEERR:: " + user)
        // user.token= token
        // await user.save();
        console.log("use¨¨¨¨¨¨:r " + user)
        return userActualizado
    } catch (error) {
        console.log(error)
    }
}

export const olvidePassword = async(token) =>{

    const user = await usersManager.comprobarToken(token)
    console.log("user" + user)
    if(user.token === token) {
        console.log("El usuario es el autentico")
    }
    return user
}

export const modificarPasswordUser = async(idUser, password) => {
    usersManager.actualizarPassword(idUser, password)
}

export const updateUserOne = async(usuarioID, obj)=>{
    try {
        const userUpdate = await usersManager.updateUserAdmin(usuarioID, obj)
        return userUpdate
    } catch (error) {
        console.log(error)
    }
}

export const deleteUserId = async (id) => {
    try {
        const UserDelete = await usersManager.deleteUser(id)
        return UserDelete
    } catch (error) {
        console.log(error)
    }
}