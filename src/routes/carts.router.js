import { Router } from "express";
import { ManagerCart } from "../DAL/DAOs/managerCart.js";

import  __dirname  from "../utils/util.js";

const router = Router();
// const managerCart = new ManagerCart(__dirname+'/Carts.json')
const managerCart = new ManagerCart()



//Crear Carrito
router.post('/', async (req, res) => {
  try {
    const userId = req.user.id; // Obtener el ID de usuario de req.user.id
    const productId = req.body.productId; // Obtener el ID del producto desde el cuerpo de la solicitud
    console.log(productId)
    const newCart = await managerCart.createCart(userId, productId);
    res.json({ cart: newCart });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error al crear el carrito' });
  }
});

//Buscar los carritos
router.get('/', async (req, res) => {
    const auth = req.isAuthenticated();
    if (!auth) {
        res.json({ message: "Debe iniciar sesión" });
        return;
    }
    const idUserSession = req.user.id;
    console.log(auth);

    const allCarts = await managerCart.getCarts();
    console.log("allCarts::::::::" + allCarts)
    const userCarts = allCarts.filter(cart => cart.user[0]._id.toString() === idUserSession);

    if (userCarts.length > 0) {
        const cart = userCarts[0];
        const cartViewProduct = Array.from(cart.product);
        const cartViewUser = [cart.user[0].first_name + " " + cart.user[0].last_name];
        console.log("cartViewUser " + cartViewUser);
        console.log("cartViewProduct " + cartViewProduct);
        res.render('cartsAll', { cartViewUser, cartViewProduct });
        // res.json({message:"cart", cartViewProduct})
    } else {
        res.json({ message: "El usuario no tiene un carrito o no está logueado" });
    }
});


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