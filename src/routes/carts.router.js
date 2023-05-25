import { Router } from "express";
import { ManagerCart } from "../DAL/managerCart.js";

import  __dirname  from "../util.js";

const router = Router();
const managerCart = new ManagerCart(__dirname+'/Carts.json')


//Crear Carrito
router.post('/', async (req, res) => {
    const newCart = await managerCart.createCart()
    res.json({cart: newCart})
})

//Buscar un carrito
router.get('/', async (req, res) => {
    const cart = await managerCart.getCarts()
    res.json({cart})
})


//Buscar un carrito
router.get('/:idCart', async (req, res) => {
    const {idCart} = req.params
    const cart = await managerCart.getCart(idCart)
    console.log(cart)
    res.render('cart',{cart})
    // res.json({cart})
})


//Agregar un producto a un carrito
router.post('/:idCart/product/:idProduct/:idUser', async (req, res) => {
const {idCart, idProduct, idUser} = req.params
const addProduct = await managerCart.addProductToCart(idCart, idProduct, idUser)
res.json({message:addProduct})
})

//Eliminar del carrito el producto seleccionado

router.delete(' /:cid/products/:pid', async(req, res) => {
    const {pid} = req.params
    const productDelete = await managerCart.deleteProduct(pid)
    res.json({message:productDelete})
})




export default router