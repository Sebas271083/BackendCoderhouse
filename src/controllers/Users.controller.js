import {getAllProducts} from '../service/Users.service.js'

export const findAllUsers = async(req, res)=>{
    try {
        const users = await getAllProducts()
        if(users.length){
            console.log(users)
            res.status(200).json({message:"Users found", users})
            // res.render('users', { users: users });
        } else {
            res.status(200).json({message:"No Users"})
        }
    } catch (error) {
        console.log(error)
    }
}