import { cartsModel } from '../db/models/Carts.model.js'


export class ManagerCart {
  constructor(path) {
    this.path = path
  }

  async getCarts() {
    try {
      const carts = await cartsModel.find()     
      .populate({ path: 'product._id', model: 'products' })
      .populate({ path: 'user', model: 'Users' })
      .lean();

      console.log("carts::::::::" + carts)
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
      console.log(cart);
      const existingProduct = cart.product.find(p => p._id.toString() === productId);
      console.log("existingProduct::::::" + existingProduct);
  
      if (existingProduct) {
        existingProduct.quantity += 1; // Aumentar la cantidad del producto existente
        const updatedCart = await cart.save();
        return updatedCart;
      } else {
        cart.product.push({ _id: productId, quantity: 1 });
      }
  
      const updatedCart = await cart.save();
      return updatedCart;
    }
  
    const newCart = await cartsModel.create({
      user: userId,
      product: [{ _id: productId, quantity: 1 }]
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


  async deleteProduct(userId, productId) {
    const allCarts = await cartsModel.find();
    const userCarts = allCarts.filter(cart => cart.user.length > 0 && cart.user[0]._id.toString() === userId);
  
    if (userCarts.length > 0) {
      const cart = userCarts[0];
      const existingProductIndex = cart.product.findIndex(p => p && p._id && p._id.toString() === productId);
  
      if (existingProductIndex !== -1) {
        if (cart.product[existingProductIndex].quantity >= 2) {
          cart.product[existingProductIndex].quantity -= 1;
        } else {
          cart.product = cart.product.filter(p => p._id.toString() !== productId);
        }
        const updatedCart = await cart.save();
        return updatedCart;
      }
    }

  }
  
  
  
  

}


//HAcer update para poder pasarlo al router de post

