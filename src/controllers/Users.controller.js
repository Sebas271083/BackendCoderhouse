import {getAllUsers, getUser, getUserByEmail, olvidePassword, modificarPasswordUser, updateUserOne, deleteUserId} from '../service/Users.service.js'
import emailOlvidePassword from '../helpers/emails.js'
import { hasData } from '../utils/util.js'

export const findAllUsers = async(req, res)=>{
    try {
        const users = await getAllUsers()
        if(users.length){
            console.log(users)
            res.render('users', {layout: 'administracion',users})
        } else {
            res.status(200).json({message:"No Users"})
        }
    } catch (error) {
        console.log(error)
    }
}


export const findOneUser = async(req, res)=>{
    try {
        res.render('recPassword');
        
    } catch (error) {
        console.log(error)
    }
}

export const UserByEmail = async(req, res) => {
    try {
        //Comprobar que el usuario existe       
        const {email} = req.body
        const user = await getUserByEmail(email)
        if(user) {
        emailOlvidePassword({
            email: user.email,
            nombre: user.nombre,
            token: user.token
        })
        res.send("Hemos enviado un mail con las indicaciones necesarias")
    }
        
    } catch (error) {
        console.log(error)
    }
}

export const recuperarPassword = async(req, res)=>{
    try {
        const {id} = req.params
        const user = await olvidePassword(id)
        if(user) {
            res.render('modificarPassword', {id})
        }
        
    } catch (error) {
        console.log(error)
    }
}

export const modificarPassword = async(req, res)=>{
    try {
        const {id} = req.params
        console.log(id)
        const user = await olvidePassword(id)
        console.log("user._id ::: " + user._id)
    
        const {password, repetirPassword} = req.body
        console.log(password, repetirPassword)
        if(password === repetirPassword) {
            console.log(password, repetirPassword)
            const passwordHash = await hasData(password)
            console.log("passwordHash " + passwordHash)
            await modificarPasswordUser(user._id, passwordHash)
        }
        res.send("Modificado")

    } catch (error) {
        console.log(error)
    }

}



export const updateUser = async(req, res)=>{
    const {id} = req.params
    try {
        const user = await getUser(id)
        if(user){
            console.log(user)
            res.render('usersEditAdmin', user );
        }else {
            res.status(200).json({message:'No user'})
        }
    } catch (error) {
        console.log(error)
    }
}

export const updateOneUser = async(req, res)=>{
    try {
        console.log(req.params)
        const {usuarioId} = req.params;
        console.log(usuarioId)
        const updatedUser = await updateUserOne(usuarioId, req.body);
        console.log(updateUser)
        res.redirect('/admin');
      } catch (error) {
        console.log(error)
      }
}

export const deleteUser = async(req, res)=>{
    try {
        const id = req.params.id;
        if (req.user.id !== id) {
            console.log(req.user.id)
            console.log(id)
            const deleteOneUser = await deleteUserId(id);
            res.redirect('/admin')    
        } else {
            res.send("No se puede eliminar a si mismo")
        }
      } catch (error) {
        console.log(error)
      }
}

