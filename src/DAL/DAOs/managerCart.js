import { cartsModel } from '../db/models/Carts.model.js'


export class ManagerCart {
  constructor(path) {
    this.path = path
  }

  async getCarts() {
    try {
      const carts = await cartsModel.find().populate('product').populate('user').lean()
      return carts
    } catch (err) {
      console.log(err)
      return []
    }
  }

  async getCart(id) {
    try {
      const cart = await cartsModel.findOne({ _id: id }).populate('product').lean();
      return cart;
    } catch (error) {
      console.error(error);
      return null;
    }
  }


  async createCart(userId, productId) {
        

        const allCarts = await cartsModel.find();
        const userCarts = allCarts.filter(cart => cart.user[0]._id.toString() === userId);
        if (userCarts.length > 0) {
          // Si se encontró un carrito para el usuario, agregar el producto al carrito existente
          const cart = userCarts[0];
          cart.product.push(productId);
          const updatedCart = await cart.save();
          return updatedCart
        }

    const newCart = await cartsModel.create({
      user: userId,
      product: [productId]
    });
    return newCart;
  }

  async addProductToCart(idCart, idProduct, idUser) {
    const cart = await cartsModel.findOne({ _id: idCart });
    if (!cart) return 'Cart not found';
    const productIndex = cart.product.findIndex(p => p.toString() === idProduct);
    if (productIndex === -1) {
      cart.product.push(idProduct);
      cart.user = idUser
    } else {
      cart.product[productIndex] = idProduct;
    }
    await cart.save();
    return 'Product added to cart';
  }


  async deleteProduct(pid) {
    try {
      const productDelete = await Product.findByIdAndDelete(pid)
      return 'product delete, ' + productDelete
    } catch (error) {
      console.error(error)
      return 'error deleting product'
    }
  }

}


//HAcer update para poder pasarlo al router de post

  