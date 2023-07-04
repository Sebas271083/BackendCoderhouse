import {getAllProducts, getUser} from '../service/Users.service.js'

export const findAllUsers = async(req, res)=>{
    try {
        const users = await getAllProducts()
        if(users.length){
            console.log(users)
            res.status(200).json({message:"Users found", users})
        } else {
            res.status(200).json({message:"No Users"})
        }
    } catch (error) {
        console.log(error)
    }
}


export const findOneUser = async(req, res)=>{
    const {id} = req.params
    try {
        const user = await getUser(id)
        if(user){
            // res.json({message:'User', user})
            res.render('recPassword');
        }else {
            res.status(200).json({message:'No user'})
        }
    } catch (error) {
        console.log(error)
    }
}