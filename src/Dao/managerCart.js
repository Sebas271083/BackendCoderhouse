import {cartsModel} from '../db/models/Carts.model.js'


export class ManagerCart {
    constructor(path){
        this.path = path
    }

    async getCarts() {
        try {
            const carts = await cartsModel.find({})
            return carts
        } catch (err) {
            console.log(err)
            return []
        }
    }

    async getCart(id) {
        try {
          const cart = await cartsModel.findOne({ _id: id });
          return cart;
        } catch (error) {
          console.error(error);
          return null;
        }
      }
      

async createCart() {
  const newCart = await cartsModel.create({
    products: []
  });
  return newCart;
}

async addProductToCart(idCart, idProduct) {
    const cart = await cartsModel.findOne({ _id: idCart });
    if (!cart) return 'Cart does not found';
    const productIndex = cart.products.findIndex(p => p.product === idProduct);
    if (productIndex === -1) {
      cart.products.push({ product: idProduct, quantity: 1 });
    } else {
      cart.products[productIndex].quantity++;
    }
    await cart.save();
    return 'product added';
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