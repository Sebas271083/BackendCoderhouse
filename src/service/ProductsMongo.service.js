import {ProductManager} from '../DAL/DAOs/managerProductsMongo.js'

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
            const product = await managerProductsMongo.getProductById(id)
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

    

    export const updateProductOne = async(id, obj)=> {
        try {
            const productUpdate = await managerProductsMongo.updateProductAdmin(id, obj)
            return productUpdate
        } catch (error) {
            console.log(error)
        }
    }