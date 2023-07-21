import { ManagerCart } from "../DAL/DAOs/managerCart.js";
const managerCart = new ManagerCart()

// const managerCart = new ManagerCart(__dirname+'/Carts.json')

export const findCart = async (req, res) => {

    const auth = req.isAuthenticated();
    if (!auth) {
        res.json({ message: "Debe iniciar sesión" });
        return;
    }
    const idUserSession = req.user.id;
    console.log(auth);

    const allCarts = await managerCart.getCarts();
    console.log("allCarts::::::::" + allCarts)
    // const userCarts = allCarts.filter(cart => cart.user[0]._id.toString() === idUserSession);
    const userCarts = allCarts.filter(cart => Array.isArray(cart.user) && cart.user.length > 0 && cart.user[0]._id.toString() === idUserSession);

    console.log(userCarts)

    if (userCarts.length > 0) {
        let showSpinner = false;
        const cart = userCarts[0];
        const cartViewProduct = Array.from(cart.product);
        const cartViewUser = [cart.user[0].first_name + " " + cart.user[0].last_name];
        console.log("cartViewUser " + cartViewUser);
        console.log("cartViewProduct " + cartViewProduct);
        res.render('cartsAll', { cartViewUser, cartViewProduct, showSpinner });
        // res.json({message:"cart", cartViewProduct})
    } else {
        res.json({ message: "El usuario no tiene un carrito o no está logueado" });
    }
}


export const createCart = async (req, res) => {
    try {
        const userId = req.user.id; // Obtener el ID de usuario de req.user.id
        const productId = req.body.productId; // Obtener el ID del producto desde el cuerpo de la solicitud
        console.log(productId)
        const newCart = await managerCart.createCart(userId, productId);
        // res.json({ cart: newCart });
        res.redirect('/carts')
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error al crear el carrito' });
    }
}

//Buscar un carrito
export const findOneCart = async (req, res) => {
    const { idCart } = req.params
    const cart = await managerCart.getCart(idCart)
    console.log(cart)
    res.render('cart', { cart })
    // res.json({cart})
}


//Agregar un producto a un carrito
export const createProductCart = async (req, res) => {
    const { idCart, idProduct, idUser } = req.params
    const addProduct = await managerCart.addProductToCart(idCart, idProduct, idUser)
    res.json({ addProduct });
}


//Eliminar del carrito el producto seleccionado

export const deleteProductCart = async(req, res) => {
    const userId = req.user.id;
    const {pid} = req.params
    console.log("pid" + pid)
    const productDelete = await managerCart.deleteProduct(userId, pid)
    console.log("productDelete:::: " + productDelete)

    if (productDelete) {
      res.json({ message: "Product deleted successfully." });

      // res.redirect('/carts')
    } else {
      res.json({ message: "Product not found or could not be deleted." });
    }
}