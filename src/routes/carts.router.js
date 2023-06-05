import { Router } from "express";
import { ManagerCart } from "../DAL/DAOs/managerCart.js";

import  __dirname  from "../utils/util.js";

const router = Router();
// const managerCart = new ManagerCart(__dirname+'/Carts.json')
const managerCart = new ManagerCart()



//Crear Carrito
router.post('/', async (req, res) => {
    const newCart = await managerCart.createCart()
    res.json({cart: newCart})
})

//Buscar los carritos
router.get('/', async (req, res) => {
    const auth = req.isAuthenticated()
    if(!auth){
        res.json({message: "Debe iniciar sesion"})
        return
    }
    const idUserSession = req.user.id
    console.log(auth)

    const cart = await managerCart.getCarts()
    const idUserCart = cart[0].user[0]._id 
    if(idUserSession == idUserCart ) {
        console.log(" cart ....... " + cart[0].product  )
        const cartViewProduct = Array.from(cart[0].product);


        const cartViewUser = [cart[0].user[0].first_name + " " + cart[0].user[0]. last_name ]
        
        console.log("cartViewUser "+ cartViewUser)
        console.log("cartViewProduct "+ cartViewProduct)

        

        res.render('cartsAll',{cartViewUser, cartViewProduct })
        
        // res.json({cart})
    } else {
        res.json({message: "El Usuario no tiene un carrito o no esta logueado"})
    }
    
    // res.render('cart', cart );
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
res.json({ addProduct });
})

//Eliminar del carrito el producto seleccionado

router.delete('/:cid/products/:pid', async(req, res) => {
    const {pid} = req.params
    const productDelete = await managerCart.deleteProduct(pid)
    res.json({message:productDelete})
})




export default router