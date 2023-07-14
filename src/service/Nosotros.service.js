import { NosotrosManager } from "../DAL/DAOs/managerNosotros.js";


const nostrosManager = new NosotrosManager()

export const getNosotros = async()=>{
    try {
        const nosotros = nostrosManager.getAll()
        return nosotros
    } catch (error) {
        console.log(error)
    }
}


export const updateNosotros = async(id, obj)=>{
    try {
        const nosotrosUpdate = await nostrosManager.updateUserAdmin(id, obj)
        return nosotrosUpdate
    } catch (error) {
        console.log(error)
    }
}

export const addNosotros = async(obj)=>{
    try {
        const newNosotros = await nostrosManager.addNosotros(obj)
        return newNosotros    
    } catch (error) {
        console.log(error)
    }    
}
