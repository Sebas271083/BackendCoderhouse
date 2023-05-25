import {ProductManager} from '../DAL/managerProductsMongo.js'

const managerProductsMongo = new ProductManager()

    export const getAllProducts = async()=>{
        try {
            const products = managerProductsMongo.getAllProducts()
            return products
        } catch (error) {
            console.log(error)
        }
    }

    export const getProductById = async(id)=>{
        try {
            const product = await managerProductsMongo.getProductById()
            return product
        } catch (error) {
            console.log(error)
        }
    }

    export const addProduct = async(obj)=>{
        try {
            const newProduct = await managerProductsMongo.addProduct(obj)
            return newProduct    
        } catch (error) {
            console.log(error)
        }    
    }